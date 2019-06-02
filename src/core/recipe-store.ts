import {Recipe} from "../shared-components/recipe";

export const saveRecipe: (recipe: Recipe) => RecipeStoreAction =
  (recipe: Recipe) => ({type: RecipeActionTypes.SAVE_RECIPE, payload: recipe});

export interface RecipeStoreAction {
  type: string;
  payload: any;
}

export const RecipeActionTypes = {
  SAVE_RECIPE: "save",
};

export const initialRecipeStore: () => Recipe[] = () => {
  return [];
};

export const emptyRecipe: () => Recipe = () => ({id: "0", name: "No recipe selected", ingredients: []});
