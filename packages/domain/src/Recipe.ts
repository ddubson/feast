import {Maybe} from "purify-ts/Maybe";
import {VolumeMeasure} from "./Volumes";
import {IngredientForm} from "./Form";
import {Weight} from "./Weight";

export type WithoutId<T> = Omit<T, "id">

export interface Quantity {
  value: number;
}

export interface Step {
  stepNumber: number;
  value: string;
}

export type UnitOfMeasure = "weight" | "quantity" | "volume";

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
