import {RecipesGateway} from "../../src/recipes/gateways/RecipesGateway";
import {Recipe} from "../../src/shared-components/recipe";

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