import {Maybe} from "purify-ts/Maybe";

interface Quantity {
  value: number;
}

export type WeightType = "NONE" | "POUNDS";

interface Weight {
  value: number;
  type: WeightType;
}

interface Ingredient {
  id: string;
  name: string;
  form: string;
  quantity: Maybe<Quantity>;
  weight: Maybe<Weight>;
}

interface Recipe {
  id: string;
  name: string;
  ingredients: Maybe<Ingredient[]>;
}

export {Recipe, Ingredient};
