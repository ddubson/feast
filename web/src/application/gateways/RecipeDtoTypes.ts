import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import {Ingredient, IngredientForm, Recipe, RecipeDetail, VolumeMeasure, WeightType} from "../../../../domain/src/types";
import {cookingVolumeApiToCookingVolume} from "../../../../domain/src/Volumes";

type VolumeType = "TABLESPOON";

export interface StepDto {
  stepNumber: number;
  value: string;
}

export interface RecipeDto {
  id: string;
  name: string;
}

export interface RecipeDetailDto extends RecipeDto {
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

export const toRecipes = (recipeResponse: Recipe[]) => recipeResponse.map((dto) => ({
  id: dto.id,
  name: dto.name,
}));

export const toRecipeDetail = (recipeDto: RecipeDetailDto): RecipeDetail => {
  const {id, name, steps, ingredients} = recipeDto;
  return {
    id,
    name,
    steps: Maybe.fromNullable(steps).map((stepDto: StepDto[]) => stepDto.map(x => ({
      stepNumber: x.stepNumber,
      value: x.value,
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
    quantity: Maybe.fromNullable(quantity).map(q => ({ value: q.value})),
    weight: Maybe.fromNullable(weight).map(w => ({
      type: (w.type as WeightType),
      value: w.value,
    })),
    volume: Maybe.fromNullable(volume).chain<VolumeMeasure>((v) => Just({
      value: v.value,
      volumeType: cookingVolumeApiToCookingVolume[v.type],
    })),
  };
};
