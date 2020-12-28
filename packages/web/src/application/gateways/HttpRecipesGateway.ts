import {RecipesGateway} from "./RecipesGateway";
import {toRecipeDetail, toRecipes} from "./RecipeDtoTypes";
import {AxiosInstance, AxiosResponse} from "axios";
import {Recipe, RecipeDetail, WithoutId} from "@ddubson/feast-domain";

export class HttpRecipesGateway implements RecipesGateway {
  constructor(private api: AxiosInstance) {
  }

  public saveRecipe(recipe: WithoutId<RecipeDetail>): Promise<RecipeDetail> {
    return this.api.post("/api/recipes", recipe, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response: AxiosResponse) => response.data)
      .then(toRecipeDetail);
  }

  public findAll(): Promise<Recipe[]> {
    return this.api.get("/api/recipes")
      .then((response: AxiosResponse) => response.data)
      .then(toRecipes);
  }

  public findById(id: string): Promise<RecipeDetail> {
    return this.api.get(`/api/recipes/${id}`)
      .then((response: AxiosResponse) => response.data)
      .then(toRecipeDetail);
  }

  public deleteRecipe(id: string): Promise<boolean> {
    return this.api.delete(`api/recipes/${id}`)
      .then((response: AxiosResponse) => response.status === 200)
  }
}
