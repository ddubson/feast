import {RecipeDetail} from "@feast/domain";
import {FetchByIdRecipesObserver, FetchByIdRecipesService} from "../../../application/services/Services";

export class StubFetchByIdRecipesService extends FetchByIdRecipesService {
  private readonly resolvedRecipeDetail: (recipeId: string) => RecipeDetail;

  constructor(resolvedRecipeDetail: (recipeId: string) => RecipeDetail) {
    super();
    this.resolvedRecipeDetail = resolvedRecipeDetail;
  }

  public dispatch(recipeId: string): void {
    this.observers.forEach((observer: FetchByIdRecipesObserver) => {
      observer.receivedRecipe(this.resolvedRecipeDetail(recipeId));
    });
  }
}
