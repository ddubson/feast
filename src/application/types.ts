import {Maybe} from "purify-ts/Maybe";

export interface Quantity {
  value: number;
}

interface Step {
  stepNumber: number;
  value: string;
}

type WeightType = "NONE" | "POUNDS";

export interface Weight {
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
  steps: Maybe<Step[]>;
}

export {Recipe, Ingredient, Step, WeightType};
