import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import {Ingredient, IngredientForm, RecipeDetail, VolumeMeasure, WeightType} from "../types";
import {cookingVolumeApiToCookingVolume} from "../Volumes";

type VolumeType = "TABLESPOON";

export interface StepDto {
  stepNumber: number;
  stepText: string;
}

export interface RecipeDto {
  id: string;
  name: string;
}

export interface RecipeDetailDto {
  id: string;
  name: string;
  ingredients: IngredientDto[];
  steps: StepDto[];
}

export interface IngredientDto {
  id: string;
  name: string;
  form: string | null;
  quantity: {
    value: number;
  };
  weight: {
    value: number;
    type: string;
  };
  volume: {
    value: number;
    type: VolumeType;
  } | null;
}

export const toRecipe = (recipeDto: RecipeDetailDto): RecipeDetail => {
  const {id, name, steps, ingredients} = recipeDto;
  return {
    id,
    name,
    steps: Just(steps.map((stepDto: StepDto) => ({
      stepNumber: stepDto.stepNumber,
      value: stepDto.stepText,
    }))),
    ingredients: Just(ingredients.map(toIngredient)),
  };
};

export const toIngredient = (ingredientDto: IngredientDto): Ingredient => {
  const {id, name, form, quantity, weight, volume} = ingredientDto;
  return {
    id,
    name,
    form: (form === null) ? Nothing : Just(form as IngredientForm),
    quantity: (quantity.value === 0) ? Nothing : Just({value: quantity.value}),
    weight: (weight.type === "NONE") ? Nothing : Just({
      type: (weight.type as WeightType),
      value: weight.value,
    }),
    volume: Maybe.fromNullable(volume).chain<VolumeMeasure>((v) => Just({
      value: v.value,
      volumeType: cookingVolumeApiToCookingVolume[v.type],
    })),
  };
};
