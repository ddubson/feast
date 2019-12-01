import {FetchByIdRecipesService} from "./Services";
import {RecipesGateway} from "../gateways/RecipesGateway";
import {Recipe} from "../types";

export class BaseFetchByIdRecipesService extends FetchByIdRecipesService {
  constructor(private recipesGateway: RecipesGateway) {
    super();
  }

  public dispatch(recipeId: string): void {
    this.recipesGateway.findById(recipeId)
      .then((recipe: Recipe) => {
          this.observers.forEach((observer) => observer.receivedRecipe(recipe));
        },
      );
  }
}
