import {AxiosInstance, AxiosResponse} from "axios";
import {Recipe, RecipeDetail} from "../types";
import {RecipesGateway} from "./RecipesGateway";
import {RecipeDetailDto, toRecipe} from "./RecipeDtoTypes";
import {Nothing} from "purify-ts/Maybe";

export class HttpRecipesGateway implements RecipesGateway {
  constructor(private api: AxiosInstance) {
  }

  public saveRecipe(recipe: Recipe): Promise<Recipe> {
    return this.api.post("/api/recipes", recipe);
  }

  public findAll(): Promise<Recipe[]> {
    return this.api.get("/api/recipes")
      .then((response: AxiosResponse) => response.data)
      .then((recipeResponse: RecipeDetailDto[]) => recipeResponse.map((dto) => ({
        id: dto.id,
        name: dto.name,
        steps: Nothing,
        ingredients: Nothing
      })));
  }

  public findById(id: string): Promise<RecipeDetail> {
    return this.api.get(`/api/recipes/${id}`)
      .then((response: AxiosResponse) => response.data)
      .then(toRecipe);
  }
}
