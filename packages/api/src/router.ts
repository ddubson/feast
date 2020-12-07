import {Express, Request, Response} from "express";
import {RecipeNotFound, ResultOrApiMessage} from "./types";
import {identity} from "purify-ts/Function";
import {Recipe} from "@ddubson/feast-domain";
import {AppConfig} from "./config";

export const router = (app: Express) => {
  app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World!");
  })

  app.get("/api/recipes", (req: Request, res: Response) => {
    AppConfig.recipeStore.fetchAllRecipes((recipesResponse) => {
      res.json(recipesResponse.recipes)
    });
  });

  app.get("/api/recipes/:id", (req: Request, res: Response) => {
    AppConfig.recipeStore.fetchRecipeById(req.params.id, ({recipe}) => {
      res.json(recipe.mapOrDefault<ResultOrApiMessage<Recipe>>(identity, RecipeNotFound))
    })
  });
}
