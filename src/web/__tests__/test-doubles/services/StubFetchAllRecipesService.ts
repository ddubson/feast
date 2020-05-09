import {FetchAllRecipesObserver, FetchAllRecipesService} from "../../../application/services/Services";
import {Recipe} from "../../../../domain/types";

export class StubFetchAllRecipesService extends FetchAllRecipesService {
  private resolveRecipes: () => Recipe[];

  public setResolvedRecipes(fn: () => Recipe[]) {
    this.resolveRecipes = fn;
  }

  public dispatch(): void {
    this.observers.forEach((observer: FetchAllRecipesObserver) => {
      const recipes = this.resolveRecipes();
      if (recipes.length === 0) {
        observer.receivedNoRecipes();
      } else {
        observer.receivedRecipes(this.resolveRecipes());
      }
    });
  }
}
