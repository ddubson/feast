import {Recipe, RecipeDetail} from "@feast/domain";
import { Maybe } from "purify-ts";

type PagedResponse = {
  paging: {
    total: number
  }
}

type FetchAllRecipesResponse = PagedResponse & {
  recipes: Recipe[]
}

type FetchRecipeByIdResponse = {
  recipe: Maybe<RecipeDetail>
}

export interface RecipeStore {
  fetchAllRecipes(onSuccess: (fetchAllResponse: FetchAllRecipesResponse) => void): void;

  fetchRecipeById(recipeId: string, onSuccess: (fetchRecipeByIdResponse: FetchRecipeByIdResponse) => void): void;
}

export { FetchAllRecipesResponse, FetchRecipeByIdResponse };
