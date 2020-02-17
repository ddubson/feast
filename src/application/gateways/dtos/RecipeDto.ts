import {IngredientDto} from "./IngredientDto";

export interface StepDto {
  stepNumber: number;
  stepText: string;
}

export interface RecipeDto {
  id: string;
  name: string;
  ingredients: IngredientDto[];
  steps: StepDto[];
}
