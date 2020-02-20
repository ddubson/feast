import {RecipesGateway} from "../../../application/gateways/RecipesGateway";
import {Recipe} from "../../../application/types";

export default class StubRecipesGateway implements RecipesGateway {
  public resolvedRecipes: Recipe[];
  public resolvedRecipe: Recipe;

  public findAll(): Promise<Recipe[]> {
    return Promise.resolve(this.resolvedRecipes);
  }

  public findById(id: string): Promise<Recipe> {
    return Promise.resolve(this.resolvedRecipe);
  }

  public saveRecipe(recipe: Recipe): Promise<Recipe> {
    return undefined;
  }
}
