import {Express, Request, Response} from "express";
import {RecipeRepository} from "./recipes/RecipeRepository";
import {APIMessage} from "./types";
import {identity} from "purify-ts/Function";
import {Maybe} from "purify-ts/Maybe";
import {Recipe} from "@feast/domain";

const recipeNotFound: APIMessage = {message: "Recipe not found."}

type ResultOrApiMessage<RESULT> = RESULT | APIMessage

export const router = (app: Express) => {
  app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World!");
  })

  app.get("/api/recipes", (req: Request, res: Response) => {
    res.json(RecipeRepository().fetchAllRecipes())
  })

  app.get("/api/recipes/:id", (req: Request, res: Response) => {
    const maybeRecipe: Maybe<Recipe> = RecipeRepository().fetchById(req.params.id);

    res.json(maybeRecipe.mapOrDefault<ResultOrApiMessage<Recipe>>(identity, recipeNotFound))
  });
}
