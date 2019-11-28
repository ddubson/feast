import {IngredientDto} from "./IngredientDto";

export interface RecipeDto {
  id: string;
  name: string;
  ingredients: IngredientDto[];
}