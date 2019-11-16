import {RecipesObserver, RecipesService} from "../../../src/application/services/RecipesService";
import {Recipe} from "../../../src/application/types";

export class StubRecipesService implements RecipesService {
  private readonly observers: Array<RecipesObserver> = [];
  private resolveRecipes: () => Array<Recipe>;

  setResolvedRecipes(fn: () => Array<Recipe>) {
    this.resolveRecipes = fn;
  }

  dispatch(): void {
    this.observers.forEach((observer: RecipesObserver) => {
      const recipes = this.resolveRecipes();
      if (recipes.length === 0) {
        observer.receivedNoRecipes();
      } else {
        observer.receivedRecipes(this.resolveRecipes());
      }
    });
  }

  registerObserver(observer: RecipesObserver): void {
    this.observers.push(observer);
  }

  unregisterObserver(observer: RecipesObserver): void {
  }
}