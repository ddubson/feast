import {Maybe} from "purify-ts/Maybe";
import {CookingVolume} from "./Volumes";

export type WithoutId<T> = Omit<T, "id">

export interface Quantity {
  value: number;
}

export interface Step {
  stepNumber: number;
  value: string;
}

export type WeightType = "NONE" | "POUNDS";

export type WeightTypeAbbrev = "" | "lbs";

export type IngredientForm = "Chopped" | "Diced";

export interface Weight {
  value: number;
  type: WeightType;
}

export interface VolumeMeasure {
  value: number;
  volumeType: CookingVolume;
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
  ingredients: Maybe<Ingredient[]>;
  steps: Maybe<Step[]>;
}
