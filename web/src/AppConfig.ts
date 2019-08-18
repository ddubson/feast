import axios, {AxiosInstance} from "axios";
import {RecipeStore} from "./core/RecipeStore";
import {HttpRecipesGateway} from "./recipes/gateways/HttpRecipesGateway";
import {RecipesGateway} from "./recipes/gateways/RecipesGateway";

const recipesApiBaseUrl = process.env.RECIPES_API_URI || "http://localhost:8080";

export const recipesApiClient: AxiosInstance = axios.create({
  baseURL: recipesApiBaseUrl,
});

export const recipesGateway: RecipesGateway = new HttpRecipesGateway();

export const recipeStore = new RecipeStore(recipesGateway);
