import {Recipe} from "../../src/shared-components/recipe";
import * as shortid from "shortid";

export const buildRecipe = (recipe?: Partial<Recipe>): Recipe => {
  const defaultRecipe: Recipe = {
    id: shortid.generate(),
    name: "Great Recipe",
    ingredients: []
  };

  return {...defaultRecipe, ...recipe};
};