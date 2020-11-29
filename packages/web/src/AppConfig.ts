import axios, {AxiosInstance} from "axios";
import * as React from "react";
import {HttpRecipesGateway} from "./application/gateways/HttpRecipesGateway";
import {RecipesGateway} from "./application/gateways/RecipesGateway";
import {BaseFetchAllRecipesService} from "./application/services/BaseFetchAllRecipesService";
import {FetchAllRecipesService, FetchByIdRecipesService} from "./application/services/Services";
import {BaseFetchByIdRecipesService} from "./application/services/BaseFetchByIdRecipesService";

declare var RECIPES_API_URI: string;

export const recipesApiClient: AxiosInstance = axios.create({baseURL: RECIPES_API_URI});

export interface DIContainer {
  recipesGateway: RecipesGateway;
  fetchAllRecipesService: FetchAllRecipesService;
  fetchByIdRecipesService: FetchByIdRecipesService;
}

const recipesGateway = new HttpRecipesGateway(recipesApiClient);
const fetchAllRecipesService = new BaseFetchAllRecipesService(recipesGateway);
const fetchByIdRecipesService = new BaseFetchByIdRecipesService(recipesGateway);

export const diContainer: DIContainer = {
  recipesGateway,
  fetchAllRecipesService,
  fetchByIdRecipesService,
};

export const DIContainerContext: React.Context<DIContainer> = React.createContext<DIContainer>(diContainer);
