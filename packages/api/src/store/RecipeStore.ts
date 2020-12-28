import {Recipe, RecipeDetail, WithoutId} from '@ddubson/feast-domain';
import {Maybe} from 'purify-ts';

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

type SaveRecipeAction = (recipe: WithoutId<RecipeDetail>, onSuccess: (savedRecipe: Recipe) => void) => void;

export type RecipeStore = {
  fetchAllRecipes: (onSuccess: (fetchAllResponse: FetchAllRecipesResponse) => void) => void;

  fetchRecipeById: (recipeId: string,
                    onSuccess: (fetchRecipeByIdResponse: FetchRecipeByIdResponse) => void) => void;

  saveRecipe: SaveRecipeAction;

  deleteRecipe(recipeId: string, onSuccess: () => void): void;
}

export {FetchAllRecipesResponse, FetchRecipeByIdResponse, SaveRecipeAction};
