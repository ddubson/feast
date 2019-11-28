import * as shortid from "shortid";
import {Recipe} from "../../src/application/types";
import {Nothing} from "purify-ts/Maybe";

export const buildRecipe = (recipe?: Partial<Recipe>): Recipe => {
  const defaultRecipe: Recipe = {
    id: shortid.generate(),
    name: "Great Recipe",
    ingredients: Nothing,
  };

  return {...defaultRecipe, ...recipe};
};
