import {FetchAllRecipesResponse, FetchRecipeByIdResponse, RecipeStore} from "../RecipeStore";
import {Recipe, RecipeDetail} from "@ddubson/feast-domain";
import shortid from "shortid";
import {Maybe} from "purify-ts/Maybe";
import {garlicLimeShrimp} from "../SampleRecipes";
import {Pool, QueryResult} from "pg";

const recipes: RecipeDetail[] = [garlicLimeShrimp].map(r => ({...r, id: shortid.generate()}));

class PgRecipeStore implements RecipeStore {
  constructor(private db: Pool) {
  }

  fetchAllRecipes(onSuccess: (fetchAllResponse: FetchAllRecipesResponse) => void): void {
    const query = "SELECT id, name FROM recipes LIMIT 1";

    this.db.query(query).then((response: QueryResult) => {
      const recipes: Recipe[] = response.rows.map(row => ({
        id: row.id,
        name: row.name,
      }));

      onSuccess({recipes, paging: {total: response.rowCount}});
    })
  }

  fetchRecipeById(recipeId: string, onSuccess: (fetchRecipeByIdResponse: FetchRecipeByIdResponse) => void): void {
    console.log("Fetch recipe by id called.");
    onSuccess({recipe: Maybe.fromNullable(recipes[0])})
  }
}

export default PgRecipeStore;
