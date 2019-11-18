import {RecipesGateway} from "../gateways/RecipesGateway";
import {Recipe} from "../types";
import {RecipesObserver, RecipesService} from "./RecipesService";

export class BaseRecipesService implements RecipesService {
  private readonly observers: RecipesObserver[] = [];

  constructor(private recipesGateway: RecipesGateway) {
  }

  public dispatch() {
    this.recipesGateway.findAll()
      .then((recipes: Recipe[]) => {
        if (recipes.length === 0) {
          this.observers.forEach((observer) => observer.receivedNoRecipes());
        } else {
          this.observers.forEach((observer) => observer.receivedRecipes(recipes));
        }
      });
  }

  public registerObserver(observer: RecipesObserver): void {
    this.observers.push(observer);
  }

  public unregisterObserver(observer: RecipesObserver): void {
    const start = this.observers.findIndex((searchElement: RecipesObserver) => searchElement === observer);
    this.observers.splice(start, 1);
  }
}
