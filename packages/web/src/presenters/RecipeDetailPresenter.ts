import {RecipeDetail} from "@ddubson/feast-domain";
import IngredientPresenter, {toIngredientPresenters} from "./IngredientPresenter";
import StepPresenter, {toStepPresenters} from "./StepPresenter";

export default class RecipeDetailPresenter {
  private readonly ingredientPresenters: IngredientPresenter[];
  private readonly stepPresenters: StepPresenter[];

  constructor(private recipe: RecipeDetail) {
    this.ingredientPresenters = toIngredientPresenters(recipe.ingredients);
    this.stepPresenters = toStepPresenters(recipe.steps);
  }

  get name(): string {
    return this.recipe.name;
  }

  get ingredients(): IngredientPresenter[] {
    return this.ingredientPresenters;
  }

  get steps(): StepPresenter[] {
    return this.stepPresenters;
  }
}
