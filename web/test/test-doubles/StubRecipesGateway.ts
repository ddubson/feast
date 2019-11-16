import {RecipesGateway} from "../../src/application/gateways/RecipesGateway";
import {Recipe} from "../../src/application/types";

export default class StubRecipesGateway implements RecipesGateway {
  public resolvedRecipes: Recipe[];

  findAll(): Promise<Recipe[]> {
    return Promise.resolve(this.resolvedRecipes);
  }

  findById(id: string): Promise<Recipe> {
    return undefined;
  }

  saveRecipe(recipe: Recipe): Promise<Recipe> {
    return undefined;
  }
}