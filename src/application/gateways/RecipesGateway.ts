import {Recipe} from "../types";

export interface RecipesGateway {
  saveRecipe(recipe: Recipe): Promise<Recipe>;
  findAll(): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe>;
}
