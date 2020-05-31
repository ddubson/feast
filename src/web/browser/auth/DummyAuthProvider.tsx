import React from "react";
import {Auth0ContextShape, Auth0ProviderOptions} from "./Auth0Interfaces";

export const DummyAuthContext: React.Context<Auth0ContextShape | null> =
  React.createContext<Auth0ContextShape | null>(null);

export const DummyAuthProvider: React.FC<Auth0ProviderOptions> =
  ({
     children,
   }: Auth0ProviderOptions & Auth0ClientOptions) => {
    const isAuthenticated = true;
    const user = {name: "Test User"}
    const loading = false;
    const popupOpen = false;
    const loginWithPopup = () => Promise.resolve();
    const handleRedirectCallback = () => Promise.resolve({appState: "solid"})

    return (
      <DummyAuthContext.Provider
        value={{
          isAuthenticated,
          user,
          loading,
          popupOpen,
          loginWithPopup,
          handleRedirectCallback,
          getIdTokenClaims: (o: getIdTokenClaimsOptions | undefined) =>
            Promise.resolve({} as any),
          loginWithRedirect: (o: RedirectLoginOptions) =>
            Promise.resolve(),
          getTokenSilently: (o: GetTokenSilentlyOptions | undefined) =>
            (Promise.resolve("token silently resolved")),
          getTokenWithPopup: (o: GetTokenWithPopupOptions | undefined) =>
            Promise.resolve("Token with popup resolved"),
          logout: (o: LogoutOptions | undefined) => ({})
        }}>
        {children}
      </DummyAuthContext.Provider>
    );
  }