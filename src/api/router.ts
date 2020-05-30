import {Express} from "express";
import {RecipeRepository} from "./recipes/RecipeRepository";
import {Recipe} from "../domain/types";
import {APIMessage} from "./types";
import {identity} from "purify-ts/Function";
import {Maybe} from "purify-ts/Maybe";

const recipeNotFound: APIMessage = {message: "Recipe not found."}

type ResultOrApiMessage<RESULT> = RESULT | APIMessage

export const router = (app: Express) => {
  app.get("/api/hello", (req, res) => {
    res.send("Hello, World!");
  })

  app.get("/api/recipes", (req, res) => {
    res.json(RecipeRepository().fetchAllRecipes())
  })

  app.get("/api/recipes/:id", (req, res) => {
    const maybeRecipe: Maybe<Recipe> = RecipeRepository().fetchById(req.params.id);
    
    res.json(maybeRecipe.mapOrDefault<ResultOrApiMessage<Recipe>>(identity, recipeNotFound))
  });
}
