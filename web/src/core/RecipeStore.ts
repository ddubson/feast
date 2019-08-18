import {computed, observable} from "mobx";
import {RecipesGateway} from "../recipes/gateways/RecipesGateway";
import {Recipe} from "../shared-components/recipe";

export class RecipeStore {
  @observable public recipes: Recipe[] = [];

  constructor(private recipesGateway: RecipesGateway) {
  }

  public addRecipe(recipe: Recipe): Promise<Recipe> {
    return this.recipesGateway.saveRecipe(recipe)
      .then((receivedRecipe: Recipe) => {
        this.recipes.push(receivedRecipe);
        return receivedRecipe;
      });
  }

  public findById(id: string): Promise<Recipe> {
    const localRecipe = this.recipes.find((recipe: Recipe) => recipe.id === id);
    if (localRecipe) {
      return Promise.resolve(localRecipe);
    }

    return this.recipesGateway.findById(id);
  }

  @computed get allRecipes(): Promise<Recipe[]> {
    return this.recipesGateway.findAll();
  }
}

export const emptyRecipe: () => Recipe = () => ({id: "0", name: "No recipe selected", ingredients: []});
