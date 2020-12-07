import {FetchAllRecipesResponse, FetchRecipeByIdResponse, RecipeStore} from "./RecipeStore";
import {RecipeDetail} from "@ddubson/feast-domain";
import shortid from "shortid";
import {Maybe} from "purify-ts/Maybe";
import {garlicLimeShrimp} from "./SampleRecipes";

const recipes: RecipeDetail[] = [garlicLimeShrimp].map(r => ({...r, id: shortid.generate()}));

class PgRecipeStore implements RecipeStore {
  fetchAllRecipes(onSuccess: (fetchAllResponse: FetchAllRecipesResponse) => void): void {
    console.log("Fetch all recipes called.");
    onSuccess({recipes, paging: {total: 1}});
  }

  fetchRecipeById(recipeId: string, onSuccess: (fetchRecipeByIdResponse: FetchRecipeByIdResponse) => void): void {
    console.log("Fetch recipe by id called.");
    onSuccess({recipe: Maybe.fromNullable(recipes[0])})
  }
}

export default PgRecipeStore;
