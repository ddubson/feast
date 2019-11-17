import {RecipesObserver} from "../../../src/application/services/RecipesService";
import {Recipe} from "../../../src/application/types";

export class RecipesObserverSpy implements RecipesObserver {
  public receivedRecipesWasCalled: boolean = false;
  public recipesReceived: Array<Recipe>;

  receivedNoRecipes(): void {
  }

  receivedRecipes(recipes: Array<Recipe>): void {
    this.receivedRecipesWasCalled = true;
    this.recipesReceived = recipes;
  }

  resetSpy() {
    this.receivedRecipesWasCalled = false;
    this.recipesReceived = null;
  }
}