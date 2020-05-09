import {RecipesGateway} from "../../../application/gateways/RecipesGateway";
import {Recipe, RecipeDetail} from "../../../../domain/types";

export default class StubRecipesGateway implements RecipesGateway {
  public resolvedRecipes: Recipe[];
  public resolvedRecipe: RecipeDetail;

  public findAll(): Promise<Recipe[]> {
    return Promise.resolve(this.resolvedRecipes);
  }

  public findById(id: string): Promise<RecipeDetail> {
    return Promise.resolve(this.resolvedRecipe);
  }

  public saveRecipe(recipe: Recipe): Promise<Recipe> {
    return undefined;
  }
}
