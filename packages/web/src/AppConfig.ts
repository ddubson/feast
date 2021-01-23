import axios, {AxiosInstance} from "axios";
import * as React from "react";
import {HttpRecipesGateway} from "./application/gateways/HttpRecipesGateway";
import {RecipesGateway} from "./application/gateways/RecipesGateway";
import {AuthTokenHandler, LocalStorageAuthTokenHandler} from "./browser/Auth";

const baseURL = process.env.REACT_APP_RECIPES_API_URI;
export const recipesApiClient: AxiosInstance = axios.create({baseURL: baseURL });
const recipesGateway = new HttpRecipesGateway(recipesApiClient);
const authTokenHandler: AuthTokenHandler = LocalStorageAuthTokenHandler();

export interface DIContainer {
  recipesGateway: RecipesGateway;
  authTokenHandler: AuthTokenHandler;
}

export const diContainer: DIContainer = {
  recipesGateway,
  authTokenHandler
};

export const DIContainerContext: React.Context<DIContainer> = React.createContext<DIContainer>(diContainer);
