import {Recipe} from "../types";
import {Observable, Observer} from "../observable/Observable";

export interface RecipesObserver extends Observer {
  receivedRecipes(recipes: Array<Recipe>): void;
  receivedNoRecipes(): void;
}

export interface RecipesService extends Observable<RecipesObserver> {
  dispatch(): void;
}