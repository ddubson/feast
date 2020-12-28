import {Ingredient, Quantity, Recipe, RecipeDetail, Step, WithoutId} from '@ddubson/feast-domain';
import {Just} from 'purify-ts/Maybe';
import {Pool, QueryResult} from 'pg';
import {Maybe} from 'purify-ts';
import {FetchAllRecipesResponse, FetchRecipeByIdResponse, RecipeStore} from '../RecipeStore';
import logger from "../../logger-config";

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
        weight: Maybe.fromPredicate(() => row.measure_type === 'weight', {value: row.weight, type: row.weight_type}),
        quantity: Maybe.fromPredicate(() => row.measure_type === 'quantity', {value: row.quantity}),
        volume: Maybe.fromPredicate(() => row.measure_type === 'volume', {value: row.volume, type: row.volume_type}),
      }));
      const recipeDetail: RecipeDetail = {
        id: recipe.id,
        name: recipe.name,
        ingredients: Maybe.fromPredicate(() => ingredients && ingredients.length > 0, ingredients).orDefault([]),
        steps: Maybe.fromPredicate(() => formattedSteps && formattedSteps.length > 0, formattedSteps).orDefault([]),
      };
      onSuccess({
        recipe: Just(recipeDetail),
      });
    }).catch((error) => {
      logger.error(error);
    });
  }

  saveRecipe(recipe: WithoutId<RecipeDetail>, onSuccess: (savedRecipe: Recipe) => void): void {
    const recipeQuery = {
      text: 'INSERT INTO recipes (name) VALUES ($1) RETURNING id, name',
      values: [recipe.name],
    };
    const ingredientsQuery = (recipeId: string, ingredient: WithoutId<Ingredient>) => ({
      text: `
          INSERT INTO recipe_ingredients (name, measure_type, form, quantity, weight,
                                          weight_type, volume, volume_type, recipe_id)
          VALUES ($1, 'quantity', $2, $3, null, null, null, null, $4)
      `,
      values: [
        ingredient.name,
        ingredient.form.orDefault(null),
        ingredient.quantity.mapOrDefault((q: Quantity) => q.value, null),
        recipeId
      ],
    });

    (async () => {
      try {
        await this.db.query("BEGIN");
        const recipeQueryResult = await this.db.query(recipeQuery)
        const [savedRecipe] = recipeQueryResult.rows;

        for (const ingredient of recipe.ingredients) {
          await this.db.query(ingredientsQuery(savedRecipe.id, ingredient));
        }

        await this.db.query("COMMIT");
        onSuccess({id: savedRecipe.id, name: savedRecipe.name});
      } catch (e) {
        await this.db.query("ROLLBACK");
        throw e;
      }
    })().catch(e => console.error(e.stack));
  }

  deleteRecipe(recipeId: string, onSuccess: () => void): void {
    const deleteRecipe = {
      text: 'DELETE FROM recipes WHERE id = $1',
      values: [recipeId]
    };

    this.db.query(deleteRecipe).then(() => {
      onSuccess();
    });
  }
}

export default PgRecipeStore;
