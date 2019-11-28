import {FetchByIdRecipesObserver, FetchByIdRecipesService} from "../../../src/application/services/Services";
import {Recipe} from "../../../src/application/types";

export class StubFetchByIdRecipesService extends FetchByIdRecipesService {
  private resolvedRecipe: (recipeId: string) => Recipe;

  public setResolvedRecipe(fn: (recipeId: string) => Recipe) {
    this.resolvedRecipe = fn;
  }

  public dispatch(recipeId: string): void {
    this.observers.forEach((observer: FetchByIdRecipesObserver) => {
      observer.receivedRecipe(this.resolvedRecipe(recipeId));
    });
  }
}
