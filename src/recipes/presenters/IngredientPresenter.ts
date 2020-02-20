import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import {Ingredient, Quantity, Weight, WeightType} from "../../application/types";

export const toIngredientPresenters = (ingredients: Maybe<Ingredient[]>): Maybe<IngredientPresenter[]> => {
  return ingredients.mapOrDefault(
    (ing: Ingredient[]) => Just(ing.map((ingredient) => new IngredientPresenter(ingredient))),
    Nothing);
};

export default class IngredientPresenter {
  private readonly WeightDisplayLookup: { [key in WeightType]: string; } = {
    NONE: "",
    POUNDS: "lbs",
  };

  constructor(private ingredient: Ingredient) {
  }

  get name(): string {
    return this.ingredient.name;
  }

  get form(): string {
    return this.ingredient.form;
  }

  get displayQuantity(): string {
    return this.ingredient.quantity.mapOrDefault((q) => `${q.value}x`, ``);
  }

  get displayWeight(): string {
    return this.ingredient.weight.mapOrDefault((q: Weight) => {
      const weightTypeDisplay = this.WeightDisplayLookup[q.type];
      return `${q.value} ${weightTypeDisplay}`;
    }, ``);
  }
}
