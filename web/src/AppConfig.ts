import axios, {AxiosInstance} from "axios";
import {HttpRecipesGateway} from "./application/gateways/HttpRecipesGateway";
import {RecipesGateway} from "./application/gateways/RecipesGateway";
import {Context} from "react";
import * as React from "react";
import {RecipesService} from "./application/services/RecipesService";
import {BaseRecipesService} from "./application/services/BaseRecipesService";

const recipesApiBaseUrl = process.env.RECIPES_API_URI || "http://localhost:8080";

export const recipesApiClient: AxiosInstance = axios.create({baseURL: recipesApiBaseUrl,});

export interface DIContainer {
  recipesGateway: RecipesGateway;
  recipesService: RecipesService;
}

const recipesGateway = new HttpRecipesGateway();
const recipesService = new BaseRecipesService(recipesGateway);

export const diContainer: DIContainer = {
  recipesGateway, recipesService
};

export const DIContainerContext: Context<DIContainer> = React.createContext<DIContainer>(diContainer);