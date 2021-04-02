import {Express, Request, Response} from 'express';
import {identity} from 'purify-ts/Function';
import {Ingredient, Recipe, WithoutId} from '@ddubson/feast-domain';
import {RecipeNotFound, ResultOrApiMessage} from './types';
import {recipeStore} from './config';
import {Maybe} from "purify-ts/Maybe";

export const router = (app: Express): void => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Feast API');
  });

  app.get('/api/hello', (req: Request, res: Response) => {
    res.send('Hello, World!');
  });

  app.get('/api/recipes', (req: Request, res: Response) => {
    recipeStore.fetchAllRecipes((recipesResponse) => {
      res.json(recipesResponse.recipes);
    });
  });

  app.get('/api/recipes/:id', (req: Request, res: Response) => {
    recipeStore.fetchRecipeById(req.params.id, ({recipe}) => {
      res.json(recipe.mapOrDefault<ResultOrApiMessage<Recipe>>(identity, RecipeNotFound));
    });
  });

  app.post('/api/recipes', (req: Request, res: Response) => {
    const ingredients = req.body.ingredients.map((i: WithoutId<Ingredient>) => ({
      name: i.name,
      form: Maybe.fromNullable(i.form),
      quantity: Maybe.fromNullable(i.quantity)
    }));

    recipeStore.saveRecipe({name: req.body.name, ingredients, steps: []}, ((savedRecipe) => {
      res.json(savedRecipe);
    }));
  });

  app.delete('/api/recipes/:id', (req: Request, res: Response) => {
    recipeStore.deleteRecipe(req.params.id, () => {
      res.send();
    });
  });
};
