import {FetchAllRecipesObserver, FetchAllRecipesService} from "../../../application/services/Services";
import {Recipe} from "../../../../../domain/src/types";

export class StubFetchAllRecipesService extends FetchAllRecipesService {
  private readonly resolveRecipes: () => Recipe[];

  constructor(resolveRecipesFn: () => Recipe[]) {
    super();
    this.resolveRecipes = resolveRecipesFn;
  }

  public dispatch(): void {
    this.observers.forEach((observer: FetchAllRecipesObserver) => {
      const recipes = this.resolveRecipes();
      if (recipes.length === 0) {
        observer.receivedNoRecipes();
      } else {
        observer.receivedRecipes(recipes);
      }
    });
  }
}
