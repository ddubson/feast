import {Ingredient, IngredientForm, Recipe, RecipeDetail, VolumeMeasure, WeightType} from "@ddubson/feast-domain";
import {Just, Maybe} from "purify-ts/Maybe";

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
  quantity?: {
    value: number;
  };
  weight?: {
    value: number;
    type: string;
  };
  volume?: {
    value: number;
    type: "tablespoon" | "teaspoon" | "cup";
  };
}

export const toRecipe = (dto: RecipeDto) => ({
  id: dto.id,
  name: dto.name,
})

export const toRecipes = (recipeResponse: Recipe[]) => recipeResponse.map(toRecipe);

export const toRecipeDetail = (recipeDto: RecipeDetailDto): RecipeDetail => {
  const {id, name, steps, ingredients} = recipeDto;
  return {
    id,
    name,
    steps: (steps || []).map((stepDto: StepDto) => ({
      stepNumber: stepDto.stepNumber,
      value: stepDto.value,
    })),
    ingredients: (ingredients || []).map(toIngredient),
  };
};

export const toIngredient = (ingredientDto: IngredientDto): Ingredient => {
  const {id, name, form, quantity, weight, volume} = ingredientDto;
  return {
    id,
    name,
    form: Maybe.fromNullable(form).map(t => t as IngredientForm),
    quantity: Maybe.fromNullable(quantity).map(q => ({value: q.value})),
    weight: Maybe.fromNullable(weight).map(w => ({
      type: (w.type as WeightType),
      value: w.value,
    })),
    volume: Maybe.fromNullable(volume).chain<VolumeMeasure>((v) => Just({
      value: v.value,
      type: v.type,
    })),
  };
};
