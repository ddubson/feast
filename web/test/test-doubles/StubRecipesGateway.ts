import {RecipesGateway} from "../../src/application/gateways/RecipesGateway";
import {Recipe} from "../../src/application/types";

export default class StubRecipesGateway implements RecipesGateway {
  public resolvedRecipes: Recipe[];

  public findAll(): Promise<Recipe[]> {
    return Promise.resolve(this.resolvedRecipes);
  }

  public findById(id: string): Promise<Recipe> {
    return undefined;
  }

  public saveRecipe(recipe: Recipe): Promise<Recipe> {
    return undefined;
  }
}
