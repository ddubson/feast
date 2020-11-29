import {RecipesGateway} from "../../../application/gateways/RecipesGateway";
import {Recipe, RecipeDetail} from "@feast/domain";
import {emptyRecipe, emptyRecipeDetail} from "../../helpers/Builders";

export default class StubRecipesGateway implements RecipesGateway {
  private readonly resolvedRecipes: Recipe[];
  private readonly resolvedRecipeDetails: RecipeDetail;
  private readonly savedRecipe: Recipe;

  constructor(onFindAll?: Recipe[], onFindById?: RecipeDetail, onSaveRecipe?: Recipe) {
    this.resolvedRecipes = onFindAll || [];
    this.resolvedRecipeDetails = onFindById || emptyRecipeDetail;
    this.savedRecipe = onSaveRecipe || emptyRecipe;
  }

  public findAll(): Promise<Recipe[]> {
    return Promise.resolve(this.resolvedRecipes);
  }

  public findById(id: string): Promise<RecipeDetail> {
    return Promise.resolve(this.resolvedRecipeDetails);
  }

  public saveRecipe(recipe: Recipe): Promise<Recipe> {
    return Promise.resolve(this.savedRecipe);
  }
}
