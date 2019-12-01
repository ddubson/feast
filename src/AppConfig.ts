import axios, {AxiosInstance} from "axios";
import * as React from "react";
import {HttpRecipesGateway} from "./application/gateways/HttpRecipesGateway";
import {RecipesGateway} from "./application/gateways/RecipesGateway";
import {BaseFetchAllRecipesService} from "./application/services/BaseFetchAllRecipesService";
import {FetchAllRecipesService, FetchByIdRecipesService} from "./application/services/Services";
import {BaseFetchByIdRecipesService} from "./application/services/BaseFetchByIdRecipesService";

const recipesApiBaseUrl = process.env.RECIPES_API_URI || "http://localhost:8080";

export const recipesApiClient: AxiosInstance = axios.create({baseURL: recipesApiBaseUrl});

export interface DIContainer {
  recipesGateway: RecipesGateway;
  fetchAllRecipesService: FetchAllRecipesService;
  fetchByIdRecipesService: FetchByIdRecipesService;
}

const recipesGateway = new HttpRecipesGateway();
const fetchAllRecipesService = new BaseFetchAllRecipesService(recipesGateway);
const fetchByIdRecipesService = new BaseFetchByIdRecipesService(recipesGateway);

export const diContainer: DIContainer = {
  recipesGateway,
  fetchAllRecipesService,
  fetchByIdRecipesService,
};

export const DIContainerContext: React.Context<DIContainer> = React.createContext<DIContainer>(diContainer);
