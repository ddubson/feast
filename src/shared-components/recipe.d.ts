import {Ingredient} from "./ingredient";

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
}
