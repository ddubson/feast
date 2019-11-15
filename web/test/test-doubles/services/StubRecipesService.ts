import {RecipesObserver, RecipesService} from "../../../src/recipes/services/RecipesService";
import {Recipe} from "../../../src/shared-components/recipe";

export class StubRecipesService implements RecipesService {
  private readonly observers: Array<RecipesObserver> = [];
  private resolveRecipes: () => Array<Recipe>;

  setResolvedRecipes(fn: () => Array<Recipe>) {
    this.resolveRecipes = fn;
  }

  dispatch(): void {
    this.observers.forEach((observer: RecipesObserver) =>
      observer.receivedRecipes(this.resolveRecipes()));
  }

  registerObserver(observer: RecipesObserver): void {
    this.observers.push(observer);
  }

  unregisterObserver(observer: RecipesObserver): void {
  }
}