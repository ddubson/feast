import {FetchAllRecipesObserver} from "../../../application/services/Services";
import {Recipe} from "../../../../../domain/src/types";

export class FetchAllRecipesObserverSpy implements FetchAllRecipesObserver {
  public receivedRecipesWasCalled: boolean = false;
  public recipesReceived?: Recipe[];

  public receivedNoRecipes(): void {
    return;
  }

  public receivedRecipes(recipes: Recipe[]): void {
    this.receivedRecipesWasCalled = true;
    this.recipesReceived = recipes;
  }

  public resetSpy() {
    this.receivedRecipesWasCalled = false;
    this.recipesReceived = undefined;
  }
}
