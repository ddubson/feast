import {Recipe, RecipeDetail, WithoutId} from "@ddubson/feast-domain";

export type SaveRecipe = (recipe: WithoutId<RecipeDetail>) => Promise<RecipeDetail>;

export interface RecipesGateway {
  saveRecipe: SaveRecipe

  findAll(): Promise<Recipe[]>;

  findById(id: string): Promise<RecipeDetail>;

  deleteRecipe(id: string): Promise<boolean>;
}
