import {AxiosResponse} from "axios";
import {recipesApiClient} from "../../AppConfig";
import {Recipe, WeightType} from "../types";
import {RecipesGateway} from "./RecipesGateway";
import {Just, Nothing} from "purify-ts/Maybe";
import {IngredientDto} from "./dtos/IngredientDto";
import {RecipeDto} from "./dtos/RecipeDto";

export class HttpRecipesGateway implements RecipesGateway {
  public saveRecipe(recipe: Recipe): Promise<Recipe> {
    return recipesApiClient.post("/api/recipes", recipe);
  }

  public findAll(): Promise<Recipe[]> {
    return recipesApiClient.get("/api/recipes")
      .then((response: AxiosResponse) => response.data);
  }

  public findById(id: string): Promise<Recipe> {
    return recipesApiClient.get(`/api/recipes/${id}`)
      .then((response: AxiosResponse) => response.data)
      .then((recipe: RecipeDto) => {
        return {
          id: recipe.id,
          name: recipe.name,
          ingredients: Just(recipe.ingredients.map((ingredient: IngredientDto) => {
            return {
              id: ingredient.id,
              name: ingredient.name,
              form: ingredient.form,
              quantity: (ingredient.quantity.value === 0) ? Nothing : Just({ value: ingredient.quantity.value }),
              weight: (ingredient.weight.type === "NONE") ? Nothing : Just({
                type: (ingredient.weight.type as WeightType),
                value: ingredient.weight.value,
              }),
            };
          })),
        };
      });
  }
}
