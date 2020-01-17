import * as shortid from "shortid";
import {Ingredient, InstructionSet, Recipe} from "../../src/application/types";
import {Just, Nothing} from "purify-ts/Maybe";

export const buildRecipe = (recipe?: Partial<Recipe>): Recipe => {
  const defaultRecipe: Recipe = {
    id: shortid.generate(),
    name: "Great Recipe",
    steps: Just(buildInstructionSet()),
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

export const buildInstructionSet = (instructionSet?: Partial<InstructionSet>): InstructionSet => {
  const defaultInstructionSet: InstructionSet = {
    1: "Do this",
    2: "Do that",
  };

  return {...defaultInstructionSet, ...instructionSet};
};
