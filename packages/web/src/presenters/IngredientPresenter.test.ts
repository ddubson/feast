import {buildIngredient} from "../test-helpers/helpers/Builders";
import IngredientPresenter, {singleOrPlural} from "./IngredientPresenter";
import {Just, Nothing} from "purify-ts";

describe("displayCulinaryMeasure", () => {
  describe("an ingredient is based off of quantity", () => {
    it("is displayed as that quantity", () => {
      const ingredientPresenter = new IngredientPresenter(buildIngredient({
        quantity: Just({value: 5}), weight: Nothing, volume: Nothing,
      }));
      expect(ingredientPresenter.renderIngredientText).toEqual("5");
    });
  });

  describe("an ingredient is based off of weight", () => {
    it("is displayed as weight with a type", () => {
      const ingredientPresenter = new IngredientPresenter(buildIngredient({
        quantity: Nothing, weight: Just({value: 5.0, type: "pounds"}), volume: Nothing,
      }));
      expect(ingredientPresenter.renderIngredientText).toEqual("5 lbs");
    });
  });

  describe("when an ingredient is based off of volume", () => {
    it("is displayed as the number of volumetric units in plural form", () => {
      expect(new IngredientPresenter(buildIngredient({
        name: "flour",
        volume: Just({value: 2, type: "tablespoon"}),
      })).renderIngredientText).toEqual("2 tablespoons of flour");

      expect(new IngredientPresenter(buildIngredient({
        name: "flour",
        volume: Just({value: 2, type: "teaspoon"}),
      })).renderIngredientText).toEqual("2 teaspoons of flour");

      expect(new IngredientPresenter(buildIngredient({
        name: "flour",
        volume: Just({value: 2, type: "cup"}),
      })).renderIngredientText).toEqual("2 cups of flour");
    });
  });
});

describe("displayForm", () => {
  describe("when ingredient form exists", () => {
    it("returns the form in display mode", () => {
      const ingredientPresenter = new IngredientPresenter(buildIngredient({form: Just("Chopped")}));
      expect(ingredientPresenter.displayForm).toEqual("Chopped");
    });
  });

  describe("when an ingredient form does not exist", () => {
    it("returns nothing", () => {
      const ingredientPresenter = new IngredientPresenter(buildIngredient({form: Nothing}));
      expect(ingredientPresenter.displayForm).toEqual("");
    });
  });
});

test("singleOrPlural", () => {
  expect(singleOrPlural({value: 1, type: "tablespoon"})).toEqual("tablespoon");
  expect(singleOrPlural({value: 2, type: "tablespoon"})).toEqual("tablespoons");

  expect(singleOrPlural({value: 1, type: "teaspoon"})).toEqual("teaspoon");
  expect(singleOrPlural({value: 2, type: "teaspoon"})).toEqual("teaspoons");

  expect(singleOrPlural({value: 1, type: "cup"})).toEqual("cup");
  expect(singleOrPlural({value: 2, type: "cup"})).toEqual("cups");
})
