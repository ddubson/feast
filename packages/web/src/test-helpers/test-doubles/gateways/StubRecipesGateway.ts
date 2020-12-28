import {RecipesGateway} from "../../../application/gateways/RecipesGateway";
import {Recipe, RecipeDetail, WithoutId} from "@ddubson/feast-domain";
import { emptyRecipeDetail} from "../../helpers/Builders";

export default class StubRecipesGateway implements RecipesGateway {
  private readonly resolvedRecipes: Recipe[];
  private readonly resolvedRecipeDetails: RecipeDetail;
  private readonly savedRecipe: RecipeDetail;

  constructor(onFindAll?: Recipe[], onFindById?: RecipeDetail, onSaveRecipe?: RecipeDetail) {
    this.resolvedRecipes = onFindAll || [];
    this.resolvedRecipeDetails = onFindById || emptyRecipeDetail;
    this.savedRecipe = onSaveRecipe || emptyRecipeDetail;
  }

  public findAll(): Promise<Recipe[]> {
    return Promise.resolve(this.resolvedRecipes);
  }

  public findById(id: string): Promise<RecipeDetail> {
    return Promise.resolve(this.resolvedRecipeDetails);
  }

  public saveRecipe(recipe: WithoutId<RecipeDetail>): Promise<RecipeDetail> {
    return Promise.resolve(this.savedRecipe);
  }

  public deleteRecipe(id: string): Promise<boolean> {
    throw new Error("not implemented yet");
  }
}
