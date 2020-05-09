import {Recipe, RecipeDetail, WithoutId} from "../types";

export interface RecipesGateway {
  saveRecipe(recipe: WithoutId<Recipe>): Promise<Recipe>;

  findAll(): Promise<Recipe[]>;

  findById(id: string): Promise<RecipeDetail>;
}
