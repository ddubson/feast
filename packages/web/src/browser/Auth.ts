import {Maybe} from "purify-ts/Maybe";

export type AuthTokenHandler = {
  storeUserToken: (token: string) => void;
  isUserTokenPresent: () => boolean;
  removeUserToken: () => void;
  getToken: () => Maybe<string>;
}

const LocalStorageAuthTokenHandler: () => AuthTokenHandler = () => ({
  storeUserToken: (token: string) => localStorage.setItem('token', token),
  isUserTokenPresent: () => localStorage.getItem('token') !== null,
  removeUserToken: () => localStorage.removeItem('token'),
  getToken: () => Maybe.fromNullable(localStorage.getItem('token')),
})

export { LocalStorageAuthTokenHandler };
