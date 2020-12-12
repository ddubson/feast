import {Recipe, RecipeDetail, WithoutId} from "@ddubson/feast-domain";
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

  saveRecipe(recipe: WithoutId<Recipe>, onSuccess: (savedRecipe: Recipe) => void): void;
}

export { FetchAllRecipesResponse, FetchRecipeByIdResponse };
