import {Ingredient, Recipe, RecipeDetail, Step } from "@ddubson/feast-domain";
import {Just, Nothing} from "purify-ts";
import shortid from "shortid";

export const buildStep = (step?: Partial<Step>): Step => {
  const defaultStep = {stepNumber: 1, value: "Do this first"};

  return {...defaultStep, ...step};
};

export const buildIngredient = (ingredient?: Partial<Ingredient>): Ingredient => {
  const defaultIngredient: Ingredient = {
    id: shortid.generate(),
    name: "Great Ingredient",
    form: Just("Chopped"),
    quantity: Nothing,
    weight: Nothing,
    volume: Nothing,
  };

  return {...defaultIngredient, ...ingredient};
};

export const buildRecipeDetail = (recipe?: Partial<RecipeDetail>): RecipeDetail => {
  const defaultRecipe: RecipeDetail = {
    id: shortid.generate(),
    name: "Great Recipe",
    steps: [buildStep()],
    ingredients: [buildIngredient()],
  };

  return {...defaultRecipe, ...recipe};
};

export const emptyRecipeDetail = buildRecipeDetail({name: "An empty recipe detail"});

export const buildRecipe = (recipe?: Partial<Recipe>): Recipe => {

  const defaultRecipe: Recipe = {
    id: shortid.generate(),
    name: "Greatest Recipe"
  };
  return {...defaultRecipe, ...recipe};
};

export const emptyRecipe = buildRecipe({name: "An empty recipe"});
