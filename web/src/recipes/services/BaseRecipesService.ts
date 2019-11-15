import {RecipesObserver, RecipesService} from "./RecipesService";
import {RecipesGateway} from "../gateways/RecipesGateway";
import {Recipe} from "../../shared-components/recipe";

export class BaseRecipesService implements RecipesService {
  private readonly observers: Array<RecipesObserver> = [];

  constructor(private recipesGateway: RecipesGateway) {
  }

  dispatch() {
    this.recipesGateway.findAll()
      .then((recipes: Array<Recipe>) => {
        this.observers.forEach(observer => observer.receivedRecipes(recipes));
      })
  }

  registerObserver(observer: RecipesObserver): void {
    this.observers.push(observer);
  }

  unregisterObserver(observer: RecipesObserver): void {
    let start = this.observers.findIndex((searchElement: RecipesObserver) => searchElement===observer);
    this.observers.splice(start, 1);
  }
}