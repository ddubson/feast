import React, {useContext, useEffect, useState} from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import browserHistory from "../History";
import {Auth0ContextShape, Auth0ProviderOptions} from "./Auth0Interfaces";
import {DummyAuthContext} from "./DummyAuthProvider";

declare var DUMMY_AUTH: boolean;

const defaultRedirectCallback = () =>
  (window.history.replaceState({}, document.title, window.location.pathname));

export const onRedirectFn = (appState: any) => {
  browserHistory.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

export const Auth0Context: React.Context<Auth0ContextShape | null> = React.createContext<Auth0ContextShape | null>(null);

export const useAuth0: () => Auth0ContextShape = () => {
  if (DUMMY_AUTH) {
    return useContext<Auth0ContextShape>(DummyAuthContext);
  } else {
    return useContext<Auth0ContextShape>(Auth0Context);
  }
}

export const Auth0Provider: React.FC<Auth0ProviderOptions & Auth0ClientOptions> =
  ({
     children,
     onRedirectCallback = defaultRedirectCallback,
     ...initOptions
   }: Auth0ProviderOptions & Auth0ClientOptions) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();
    const [auth0Client, setAuth0Client] = useState<Auth0Client>();
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
      const initAuth0 = async () => {
        const auth0FromHook = await createAuth0Client(initOptions);
        setAuth0Client(auth0FromHook);

        if (window.location.search.includes("code=") &&
          window.location.search.includes("state=")) {
          const {appState} = await auth0FromHook.handleRedirectCallback();
          onRedirectCallback(appState);
        }

        const isAuthed = await auth0FromHook.isAuthenticated();
        setIsAuthenticated(isAuthed);

        if (isAuthed) {
          setUser(await auth0FromHook.getUser());
        }

        setLoading(false);
      };

      initAuth0();
    }, []);

    const loginWithPopup = async (o: PopupLoginOptions) => {
      setPopupOpen(true);
      try {
        await auth0Client.loginWithPopup(o);
      } catch (error) {
        console.error(error);
      } finally {
        setPopupOpen(false);
      }
      setUser(await auth0Client.getUser());
      setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
      setLoading(true);
      await auth0Client.handleRedirectCallback();
      setUser(await auth0Client.getUser());
      setLoading(false);
      setIsAuthenticated(true);
      return user;
    };

    return (
      <Auth0Context.Provider
        value={{
          isAuthenticated,
          user,
          loading,
          popupOpen,
          loginWithPopup,
          handleRedirectCallback,
          getIdTokenClaims: (o: getIdTokenClaimsOptions | undefined) =>
            auth0Client!.getIdTokenClaims(o),
          loginWithRedirect: (o: RedirectLoginOptions) =>
            auth0Client!.loginWithRedirect(o),
          getTokenSilently: (o: GetTokenSilentlyOptions | undefined) =>
            auth0Client!.getTokenSilently(o),
          getTokenWithPopup: (o: GetTokenWithPopupOptions | undefined) =>
            auth0Client!.getTokenWithPopup(o),
          logout: (o: LogoutOptions | undefined) => auth0Client!.logout(o)
        }}>
        {children}
      </Auth0Context.Provider>
    );
  };
