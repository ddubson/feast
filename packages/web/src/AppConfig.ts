import axios, {AxiosInstance} from "axios";
import * as React from "react";
import {HttpRecipesGateway} from "./application/gateways/HttpRecipesGateway";
import {RecipesGateway} from "./application/gateways/RecipesGateway";

const baseURL = process.env.REACT_APP_RECIPES_API_URI;
export const recipesApiClient: AxiosInstance = axios.create({baseURL: baseURL });

export interface DIContainer {
  recipesGateway: RecipesGateway;
}

const recipesGateway = new HttpRecipesGateway(recipesApiClient);

export const diContainer: DIContainer = {
  recipesGateway,
};

export const DIContainerContext: React.Context<DIContainer> = React.createContext<DIContainer>(diContainer);
