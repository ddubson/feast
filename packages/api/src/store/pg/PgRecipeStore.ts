import {FetchAllRecipesResponse, FetchRecipeByIdResponse, RecipeStore} from "../RecipeStore";
import {Recipe, RecipeDetail} from "@ddubson/feast-domain";
import {Just, Nothing} from "purify-ts/Maybe";
import {Pool, QueryResult} from "pg";
import {Maybe} from "purify-ts";

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
      text: "SELECT * FROM recipe_ingredients WHERE recipe_id = $1",
      values: [recipeId]
    };
    const steps = {
      text: "SELECT steps FROM recipe_steps WHERE recipe_id = $1",
      values: [recipeId]
    };

    const recipeQuery = this.db.query(recipe);
    const ingredientQuery = this.db.query(ingredients);
    const stepsQuery = this.db.query(steps);

    Promise.all([recipeQuery, ingredientQuery, stepsQuery]).then((values: QueryResult[]) => {
      const [recipeResult, ingredientResult, stepsResult] = values;
      const [recipe] = recipeResult.rows;
      const [stepRow] = stepsResult.rows;

      const formattedSteps = stepRow.steps.split("|").map((value: string, index: number) => ({
        stepNumber: index + 1,
        value
      }));
      const recipeDetail: RecipeDetail = {
        id: recipe.id,
        name: recipe.name,
        ingredients: Just(ingredientResult.rows.map(row => ({
          id: row.id,
          name: row.name,
          form: Maybe.fromNullable(row.form),
          weight: row.measure_type === "weight" ? Just({value: row.weight, type: row.weight_type}) : Nothing,
          quantity: row.measure_type === "quantity" ? Just({value: row.quantity}) : Nothing,
          volume: row.measure_type === "volume" ? Just({value: row.volume, type: row.volume_type}) : Nothing
        }))),
        steps: Just(formattedSteps)
      };
      onSuccess({
        recipe: Just(recipeDetail)
      });
    }).catch(error => {
      console.error(error);
    });
  }
}

export default PgRecipeStore;
