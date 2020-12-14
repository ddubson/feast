import {Ingredient, Recipe, RecipeDetail, Step, WithoutId} from '@ddubson/feast-domain';
import {Just, Nothing} from 'purify-ts/Maybe';
import {Pool, QueryResult} from 'pg';
import {Maybe} from 'purify-ts';
import {FetchAllRecipesResponse, FetchRecipeByIdResponse, RecipeStore} from '../RecipeStore';

class PgRecipeStore implements RecipeStore {
  constructor(private db: Pool) {
  }

  fetchAllRecipes(onSuccess: (fetchAllResponse: FetchAllRecipesResponse) => void): void {
    const query = 'SELECT id, name FROM recipes';

    this.db.query(query).then((response: QueryResult) => {
      const recipes: Recipe[] = response.rows.map((row) => ({
        id: row.id,
        name: row.name,
      }));

      onSuccess({recipes, paging: {total: response.rowCount}});
    });
  }

  fetchRecipeById(recipeId: string, onSuccess: (fetchRecipeByIdResponse: FetchRecipeByIdResponse) => void): void {
    const recipe = {
      text: 'SELECT name FROM recipes WHERE id = $1',
      values: [recipeId],
    };
    const ingredients = {
      text: 'SELECT * FROM recipe_ingredients WHERE recipe_id = $1',
      values: [recipeId],
    };
    const steps = {
      text: 'SELECT steps FROM recipe_steps WHERE recipe_id = $1',
      values: [recipeId],
    };

    const recipeQuery = this.db.query(recipe);
    const ingredientQuery = this.db.query(ingredients);
    const stepsQuery = this.db.query(steps);

    Promise.all([recipeQuery, ingredientQuery, stepsQuery]).then((values: QueryResult[]) => {
      const [recipeResult, ingredientResult, stepsResult] = values;
      const [recipe] = recipeResult.rows;
      const [stepRow] = stepsResult.rows;

      const formattedSteps: Step[] = stepRow?.steps.split('|').map((value: string, index: number) => ({
        stepNumber: index + 1,
        value,
      }));
      const ingredients: Ingredient[] = ingredientResult?.rows?.map((row) => ({
        id: row.id,
        name: row.name,
        form: Maybe.fromNullable(row.form),
        weight: row.measure_type === 'weight' ? Just({value: row.weight, type: row.weight_type}) : Nothing,
        quantity: row.measure_type === 'quantity' ? Just({value: row.quantity}) : Nothing,
        volume: row.measure_type === 'volume' ? Just({value: row.volume, type: row.volume_type}) : Nothing,
      }));

      const recipeDetail: RecipeDetail = {
        id: recipe.id,
        name: recipe.name,
        ingredients: ingredients && ingredients.length > 0 ? Just(ingredients) : Nothing,
        steps: formattedSteps && formattedSteps.length > 0 ? Just(formattedSteps) : Nothing,
      };
      onSuccess({
        recipe: Just(recipeDetail),
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  saveRecipe(recipe: WithoutId<Recipe>, onSuccess: (savedRecipe: Recipe) => void): void {
    const query = {
      text: 'INSERT INTO recipes (name) VALUES ($1) RETURNING id, name',
      values: [recipe.name],
    };

    this.db.query(query).then((result: QueryResult) => {
      const [savedRecipe] = result.rows;
      onSuccess({id: savedRecipe.id, name: savedRecipe});
    });
  }
}

export default PgRecipeStore;
