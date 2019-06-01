import {Recipe} from "../shared-components/recipe";

export abstract class RecipeStore {
  public abstract save(recipe: Recipe): void;
}
