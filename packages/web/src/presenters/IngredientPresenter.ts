import {Maybe} from "purify-ts/Maybe";
import {
  Ingredient,
  IngredientForm,
  Quantity,
  VolumeMeasure,
  VolumeMeasureTypePlural,
  Weight,
  WeightTypeAbbr,
  WithoutId
} from "@ddubson/feast-domain";

export const toIngredientPresenter = (ingredient: WithoutId<Ingredient> | Ingredient): IngredientPresenter =>
  new IngredientPresenter(ingredient);

export const toIngredientPresenters = (ingredients: Ingredient[]): IngredientPresenter[] =>
  ingredients.map((i: Ingredient) => new IngredientPresenter(i));

export const singleOrPlural: (volumeMeasure: VolumeMeasure) => string = (volumeMeasure) =>
  volumeMeasure.value > 1 ? VolumeMeasureTypePlural[volumeMeasure.type] : volumeMeasure.type;

export default class IngredientPresenter {
  constructor(private ingredient: Ingredient | WithoutId<Ingredient>) {
  }

  get name(): string {
    return this.ingredient.name;
  }

  get form(): Maybe<IngredientForm> {
    return this.ingredient.form;
  }

  get renderIngredientText(): string {
    if (this.ingredient.quantity.isJust()) {
      return `${this.displayQuantity}, ${this.displayForm}`;
    } else if (this.ingredient.weight.isJust()) {
      return this.displayWeight;
    } else {
      return `${this.displayVolume} of ${this.displayForm}`;
    }
  }

  get displayVolume(): string {
    return this.ingredient.volume
      .mapOrDefault((q: VolumeMeasure) => `${q.value} ${singleOrPlural(q)} of ${this.ingredient.name}`, ``);
  }

  get displayForm(): string {
    return this.ingredient.form.mapOrDefault((q: IngredientForm) => q, ``);
  }

  get displayQuantity(): string {
    return this.ingredient.quantity.mapOrDefault((q: Quantity) => `${q.value} ${this.ingredient.name}`, ``);
  }

  get displayWeight(): string {
    return this.ingredient.weight
      .mapOrDefault((q: Weight) => `${q.value} ${WeightTypeAbbr[q.type]}`, ``);
  }
}
