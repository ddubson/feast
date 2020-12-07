import {FetchAllRecipesResponse, FetchRecipeByIdResponse, RecipeStore} from "../RecipeStore";
import {Ingredient, Recipe, RecipeDetail} from "@ddubson/feast-domain";
import shortid from "shortid";
import {Just, Maybe, Nothing} from "purify-ts/Maybe";
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
    const recipe = {
      text: "SELECT name FROM recipes WHERE id = $1",
      values: [recipeId]
    };
    const ingredients = {
      text: "SELECT  * FROM recipe_ingredients WHERE recipe_id = $1",
      values: [recipeId]
    };

    const recipeQuery = this.db.query(recipe);
    const ingredientQuery = this.db.query(ingredients);

    Promise.all([recipeQuery, ingredientQuery]).then((values: QueryResult[]) => {
      const [recipeResult, ingredientResult] = values;
      const [recipe] = recipeResult.rows;
      const recipeDetail: RecipeDetail = {
        id: recipe.id,
        name: recipe.name,
        ingredients: Just(ingredientResult.rows.map(row => ({
          id: row.id,
          name: row.name,
          form: Nothing,
          weight: Nothing,
          quantity: Nothing,
          volume: Nothing
        }))),
        steps: Nothing
      };
      onSuccess({
        recipe: Just(recipeDetail)
      });
    }).catch(error => {
      console.error(error);
    });

    // this.db.query(recipe).then((result: QueryResult) => {
    //   onSuccess({
    //     recipe: Maybe.fromNullable(recipes[0])
    //   });
    // }).catch((error) => {
    //   console.error("Fetch from store error: ", error);
    // });
  }
}

export default PgRecipeStore;
