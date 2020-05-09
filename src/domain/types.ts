import {Maybe} from "purify-ts/Maybe";
import {CookingVolume} from "./Volumes";

export type WithoutId<T> = Omit<T, "id">

export interface Quantity {
  value: number;
}

interface Step {
  stepNumber: number;
  value: string;
}

type WeightType = "NONE" | "POUNDS";

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

interface Ingredient {
  id: string;
  name: string;
  form: Maybe<IngredientForm>;
  quantity: Maybe<Quantity>;
  weight: Maybe<Weight>;
  volume: Maybe<VolumeMeasure>;
}

interface Recipe {
  id: string;
  name: string;
}

interface RecipeDetail extends Recipe {
  ingredients: Maybe<Ingredient[]>;
  steps: Maybe<Step[]>;
}

export {Recipe, RecipeDetail, Ingredient, Step, WeightType};
