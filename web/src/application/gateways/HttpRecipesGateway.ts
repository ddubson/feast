import {AxiosResponse} from "axios";
import { recipesApiClient } from "../../AppConfig";
import {Recipe} from "../types";
import {RecipesGateway} from "./RecipesGateway";

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
      .then((response: AxiosResponse) => response.data);
  }
}
