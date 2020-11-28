import {FetchByIdRecipesObserver, FetchByIdRecipesService} from "../../../application/services/Services";
import {RecipeDetail} from "../../../../../domain/src/types";

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
