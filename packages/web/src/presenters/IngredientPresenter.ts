import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import {
  Ingredient,
  IngredientForm,
  singleOrPlural,
  VolumeMeasure, Weight,
  WeightType,
  WeightTypeAbbrev
} from "@feast/domain";

export const toIngredientPresenters = (ingredients: Maybe<Ingredient[]>): Maybe<IngredientPresenter[]> => {
  return ingredients.mapOrDefault(
    (ing: Ingredient[]) => Just(ing.map((ingredient) => new IngredientPresenter(ingredient))),
    Nothing);
};

export default class IngredientPresenter {
  private readonly WeightDisplayLookup: { [key in WeightType]: WeightTypeAbbrev; } = {
    NONE: "",
    POUNDS: "lbs",
  };

  constructor(private ingredient: Ingredient) {
  }

  get name(): string {
    return this.ingredient.name;
  }

  get form(): Maybe<IngredientForm> {
    return this.ingredient.form;
  }

  get displayCulinaryMeasure(): string {
    if (this.ingredient.quantity.isJust()) {
      return this.displayQuantity;
    } else if (this.ingredient.weight.isJust()) {
      return this.displayWeight;
    } else {
      return this.displayVolume;
    }
  }

  get displayVolume(): string {
    return this.ingredient.volume.mapOrDefault((q: VolumeMeasure) => `${q.value} ${singleOrPlural(q)}`, ``);
  }

  get displayForm(): string {
    return this.ingredient.form.mapOrDefault((q: IngredientForm) => q, ``);
  }

  get displayQuantity(): string {
    return this.ingredient.quantity.mapOrDefault((q) => `${q.value}`, ``);
  }

  get displayWeight(): string {
    return this.ingredient.weight.mapOrDefault((q: Weight) => {
      const weightTypeDisplay = this.WeightDisplayLookup[q.type];
      return `${q.value} ${weightTypeDisplay}`;
    }, ``);
  }
}
