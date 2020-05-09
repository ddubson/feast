import * as shortid from "shortid";
import {Ingredient, Recipe, RecipeDetail, Step} from "../../application/types";
import {Just, Nothing} from "purify-ts/Maybe";

export const buildRecipeDetail = (recipe?: Partial<RecipeDetail>): RecipeDetail => {
  const defaultRecipe: RecipeDetail = {
    id: shortid.generate(),
    name: "Great Recipe",
    steps: Just([buildStep()]),
    ingredients: Just([buildIngredient()]),
  };

  return {...defaultRecipe, ...recipe};
};

export const buildIngredient = (ingredient?: Partial<Ingredient>): Ingredient => {
  const defaultIngredient: Ingredient = {
    id: shortid.generate(),
    name: "Great Ingredient",
    form: Just("Chopped"),
    quantity: Just({value: 2}),
    weight: Nothing,
    volume: Nothing,
  };

  return {...defaultIngredient, ...ingredient};
};

export const buildStep = (step?: Partial<Step>): Step => {
  const defaultStep = { stepNumber: 1, value: "Do this first"};

  return { ...defaultStep, ...step};
};
