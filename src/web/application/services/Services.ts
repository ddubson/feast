import {AbstractObservable, Observer} from "../observable/Observable";
import {Recipe, RecipeDetail} from "../types";

export interface FetchAllRecipesObserver extends Observer {
  receivedRecipes(recipes: Recipe[]): void;
  receivedNoRecipes(): void;
}

export interface FetchByIdRecipesObserver extends Observer {
  receivedRecipe(recipe: RecipeDetail): void;
}

export abstract class FetchAllRecipesService extends AbstractObservable<FetchAllRecipesObserver> {
  public abstract dispatch(): void;
}

export abstract class FetchByIdRecipesService extends AbstractObservable<FetchByIdRecipesObserver> {
  public abstract dispatch(recipeId: string): void;
}
