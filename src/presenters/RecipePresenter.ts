import {Maybe} from "purify-ts/Maybe";
import {Recipe} from "../application/types";
import IngredientPresenter, {toIngredientPresenters} from "./IngredientPresenter";
import StepPresenter, {toStepPresenters} from "./StepPresenter";

export default class RecipePresenter {
  private readonly ingredientPresenters: Maybe<IngredientPresenter[]>;
  private readonly stepPresenters: Maybe<StepPresenter[]>;

  constructor(private recipe: Recipe) {
    this.ingredientPresenters = toIngredientPresenters(recipe.ingredients);
    this.stepPresenters = toStepPresenters(recipe.steps);
  }

  get name(): string {
    return this.recipe.name;
  }

  get ingredients(): Maybe<IngredientPresenter[]> {
    return this.ingredientPresenters;
  }

  get steps(): Maybe<StepPresenter[]> {
    return this.stepPresenters;
  }
}
