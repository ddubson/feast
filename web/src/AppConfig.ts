import axios, {AxiosInstance} from "axios";
import * as React from "react";
import {HttpRecipesGateway} from "./application/gateways/HttpRecipesGateway";
import {RecipesGateway} from "./application/gateways/RecipesGateway";
import {BaseRecipesService} from "./application/services/BaseRecipesService";
import {RecipesService} from "./application/services/RecipesService";

const recipesApiBaseUrl = process.env.RECIPES_API_URI || "http://localhost:8080";

export const recipesApiClient: AxiosInstance = axios.create({baseURL: recipesApiBaseUrl});

export interface DIContainer {
  recipesGateway: RecipesGateway;
  recipesService: RecipesService;
}

const recipesGateway = new HttpRecipesGateway();
const recipesService = new BaseRecipesService(recipesGateway);

export const diContainer: DIContainer = {
  recipesGateway, recipesService,
};

export const DIContainerContext: React.Context<DIContainer> = React.createContext<DIContainer>(diContainer);
