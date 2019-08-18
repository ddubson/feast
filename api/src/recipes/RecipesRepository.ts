import {injectable} from "inversify";
import * as shortid from "shortid";
import {Repository} from "../shared-components/Repository";
import {Recipe} from "./Recipe";

@injectable()
export class RecipesRepository implements Repository<Recipe> {
  private recipes: Recipe[] = [];

  public fetchAll(): Recipe[] {
    return this.recipes;
  }

  public findById(id: string): Recipe | undefined {
    return this.recipes.find((recipe: Recipe) => recipe.id === id);
  }

  public save(recipe: Recipe): Recipe {
    const baseRecipe: Recipe = {
      id: shortid.generate(),
      name: "Recipe",
      ingredients: [],
    };
    const newRecipe = { ...baseRecipe, ...recipe };
    this.recipes.push(newRecipe);
    return newRecipe;
  }
}
