import {garlicLimeShrimp} from "./SampleRecipes";
import shortid from "shortid";
import {Maybe} from "purify-ts/Maybe";
import { Recipe, RecipeDetail } from "@feast/domain";

const recipes: RecipeDetail[] = [garlicLimeShrimp].map(r => ({...r, id: shortid.generate()}));

export const RecipeRepository = () => {
  const fetchAllRecipes = (): Recipe[] => recipes

  const fetchById = (recipeId: string): Maybe<Recipe> =>
    Maybe.fromNullable(recipes.find((recipe: RecipeDetail) => recipe.id === recipeId))

  return {
    fetchAllRecipes,
    fetchById
  }
};
