import {Recipe} from "../../shared-components/recipe";

export interface Observer {}

export interface RecipesObserver extends Observer {
  receivedRecipes(recipes: Array<Recipe>): void;
}

export interface Observable <T extends Observer> {
  registerObserver(observer: T): void;
  unregisterObserver(observer: T): void;
}

export interface RecipesService extends Observable<RecipesObserver> {
  dispatch(): void;
}