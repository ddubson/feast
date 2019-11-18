import * as shortid from "shortid";
import {Recipe} from "../../src/application/types";

export const buildRecipe = (recipe?: Partial<Recipe>): Recipe => {
  const defaultRecipe: Recipe = {
    id: shortid.generate(),
    name: "Great Recipe",
    ingredients: [],
  };

  return {...defaultRecipe, ...recipe};
};
