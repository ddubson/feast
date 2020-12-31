import {Maybe} from "purify-ts/Maybe";

export type WithoutId<T> = Omit<T, "id">

export interface Quantity {
  value: number;
}

export interface Step {
  stepNumber: number;
  value: string;
}

export type WeightType = "pounds";

export type IngredientForm =
  "N/A" | "Chopped" | "Diced" | "Cleaned" | "Minced" | "Ground" | "Zested";

export type UnitOfMeasure = "weight" | "quantity" | "volume";

export interface Weight {
  value: number;
  type: WeightType;
}

export interface VolumeMeasure {
  value: number;
  type: "tablespoon" | string;
}

export interface Ingredient {
  id: string;
  name: string;
  form: Maybe<IngredientForm>;
  quantity: Maybe<Quantity>;
  weight: Maybe<Weight>;
  volume: Maybe<VolumeMeasure>;
}

export interface Recipe {
  id: string;
  name: string;
}

export interface RecipeDetail extends Recipe {
  ingredients: Ingredient[];
  steps: Step[];
}
