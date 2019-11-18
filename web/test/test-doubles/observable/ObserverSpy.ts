import {RecipesObserver} from "../../../src/application/services/RecipesService";
import {Recipe} from "../../../src/application/types";

export class RecipesObserverSpy implements RecipesObserver {
  public receivedRecipesWasCalled: boolean = false;
  public recipesReceived: Recipe[];

  public receivedNoRecipes(): void {
    return;
  }

  public receivedRecipes(recipes: Recipe[]): void {
    this.receivedRecipesWasCalled = true;
    this.recipesReceived = recipes;
  }

  public resetSpy() {
    this.receivedRecipesWasCalled = false;
    this.recipesReceived = null;
  }
}
