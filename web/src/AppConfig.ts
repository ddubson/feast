import axios, {AxiosInstance} from "axios";
import {HttpRecipesGateway} from "./recipes/gateways/HttpRecipesGateway";
import {RecipesGateway} from "./recipes/gateways/RecipesGateway";
import {Context} from "react";
import * as React from "react";

const recipesApiBaseUrl = process.env.RECIPES_API_URI || "http://localhost:8080";

export const recipesApiClient: AxiosInstance = axios.create({baseURL: recipesApiBaseUrl,});

export interface DIContainer {
  recipesGateway: RecipesGateway;
}

export const diContainer: DIContainer = {
  recipesGateway: new HttpRecipesGateway()
};

export const DIContainerContext: Context<DIContainer> = React.createContext<DIContainer>(diContainer);