import {Recipe, RecipeDetail} from "../../domain/types";
import {garlicLimeShrimp} from "./SampleRecipes";
import shortid from "shortid";
import {Maybe} from "purify-ts/Maybe";

const recipes: RecipeDetail[] = [garlicLimeShrimp].map(r => ({...r, id: shortid.generate()}));

export const RecipeRepository = () => {
  const fetchAllRecipes = (): Recipe[] => recipes

  const fetchById = (recipeId: string): Maybe<Recipe> =>
    Maybe.fromNullable(recipes.find((recipe) => recipe.id === recipeId))

  return {
    fetchAllRecipes,
    fetchById
  }
};
