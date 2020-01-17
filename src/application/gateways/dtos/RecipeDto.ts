import {IngredientDto} from "./IngredientDto";

export interface InstructionSetDto {
  [key: number]: string;
}

export interface RecipeDto {
  id: string;
  name: string;
  ingredients: IngredientDto[];
  steps: InstructionSetDto;
}
