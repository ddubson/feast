import {AxiosInstance, AxiosResponse} from "axios";
import {Recipe, WeightType} from "../types";
import {RecipesGateway} from "./RecipesGateway";
import {Just, Nothing} from "purify-ts/Maybe";
import {IngredientDto} from "./dtos/IngredientDto";
import {RecipeDto, StepDto} from "./dtos/RecipeDto";

export class HttpRecipesGateway implements RecipesGateway {
  constructor(private api: AxiosInstance) {
  }

  public saveRecipe(recipe: Recipe): Promise<Recipe> {
    return this.api.post("/api/recipes", recipe);
  }

  public findAll(): Promise<Recipe[]> {
    return this.api.get("/api/recipes")
      .then((response: AxiosResponse) => response.data);
  }

  public findById(id: string): Promise<Recipe> {
    return this.api.get(`/api/recipes/${id}`)
      .then((response: AxiosResponse) => response.data)
      .then((recipe: RecipeDto) => ({
        id: recipe.id,
        name: recipe.name,
        steps: Just(recipe.steps.map((stepDto: StepDto) => ({
          stepNumber: stepDto.stepNumber,
          value: stepDto.stepText,
        }))),
        ingredients: Just(recipe.ingredients.map((ingredient: IngredientDto) => ({
          id: ingredient.id,
          name: ingredient.name,
          form: ingredient.form,
          quantity: (ingredient.quantity.value === 0) ? Nothing : Just({value: ingredient.quantity.value}),
          weight: (ingredient.weight.type === "NONE") ? Nothing : Just({
            type: (ingredient.weight.type as WeightType),
            value: ingredient.weight.value,
          }),
        }))),
      }));
  }
}
