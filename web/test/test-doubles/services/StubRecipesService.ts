import {RecipesObserver, RecipesService} from "../../../src/application/services/RecipesService";
import {Recipe} from "../../../src/application/types";

export class StubRecipesService implements RecipesService {
  private readonly observers: RecipesObserver[] = [];
  private resolveRecipes: () => Recipe[];

  public setResolvedRecipes(fn: () => Recipe[]) {
    this.resolveRecipes = fn;
  }

  public dispatch(): void {
    this.observers.forEach((observer: RecipesObserver) => {
      const recipes = this.resolveRecipes();
      if (recipes.length === 0) {
        observer.receivedNoRecipes();
      } else {
        observer.receivedRecipes(this.resolveRecipes());
      }
    });
  }

  public registerObserver(observer: RecipesObserver): void {
    this.observers.push(observer);
  }

  public unregisterObserver(observer: RecipesObserver): void {
    return;
  }
}
