import {Observable, Observer} from "../observable/Observable";
import {Recipe} from "../types";

export interface RecipesObserver extends Observer {
  receivedRecipes(recipes: Recipe[]): void;
  receivedNoRecipes(): void;
}

export interface RecipesService extends Observable<RecipesObserver> {
  dispatch(): void;
}
