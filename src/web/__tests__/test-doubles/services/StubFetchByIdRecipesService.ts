import {FetchByIdRecipesObserver, FetchByIdRecipesService} from "../../../application/services/Services";
import {RecipeDetail} from "../../../../domain/types";

export class StubFetchByIdRecipesService extends FetchByIdRecipesService {
  private resolvedRecipe: (recipeId: string) => RecipeDetail;

  public setResolvedRecipe(fn: (recipeId: string) => RecipeDetail) {
    this.resolvedRecipe = fn;
  }

  public dispatch(recipeId: string): void {
    this.observers.forEach((observer: FetchByIdRecipesObserver) => {
      observer.receivedRecipe(this.resolvedRecipe(recipeId));
    });
  }
}
