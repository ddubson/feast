import {RecipesGateway} from "../gateways/RecipesGateway";
import {Recipe} from "../../../domain/types";
import {FetchAllRecipesService} from "./Services";

export class BaseFetchAllRecipesService extends FetchAllRecipesService {
  constructor(private recipesGateway: RecipesGateway) {
    super();
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
}
