import * as shortid from "shortid";
import {Ingredient, Recipe, Step} from "../../application/types";
import {Just, Nothing} from "purify-ts/Maybe";

export const buildRecipe = (recipe?: Partial<Recipe>): Recipe => {
  const defaultRecipe: Recipe = {
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
    form: "Chopped",
    quantity: Just({value: 2}),
    weight: Nothing,
  };

  return {...defaultIngredient, ...ingredient};
};

export const buildStep = (step?: Partial<Step>): Step => {
  const defaultStep = { stepNumber: 1, value: "Do this first"};

  return { ...defaultStep, ...step};
};
