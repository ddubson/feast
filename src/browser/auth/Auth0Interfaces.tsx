import React from "react";

export interface Auth0ContextShape {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: boolean;

  loginWithPopup(options: PopupLoginOptions): Promise<void>;

  handleRedirectCallback(): Promise<RedirectLoginResult>;

  getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>;

  loginWithRedirect(o: RedirectLoginOptions): Promise<void>;

  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>;

  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>;

  logout(o?: LogoutOptions): void;
}

export interface Auth0ProviderOptions {
  children: React.ReactElement;

  onRedirectCallback?(result: RedirectLoginResult): void;
}
