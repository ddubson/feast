import {Recipe} from "../shared-components/recipe";
import {initialRecipeStore, RecipeActionTypes, RecipeStoreAction} from "./recipe-store";

export const recipeStoreReducer: (recipes: Recipe[], recipeStoreAction: RecipeStoreAction) => Recipe[] =
  (recipes = initialRecipeStore(), recipeStoreAction) => {
    switch (recipeStoreAction.type) {
      case RecipeActionTypes.SAVE_RECIPE: {
        const recipe = recipeStoreAction.payload;
        return [...recipes, recipe];
      }
      default: {
        return recipes;
      }
    }
  };
