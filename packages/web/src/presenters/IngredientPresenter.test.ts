import {buildIngredient} from "../test-helpers/helpers/Builders";
import IngredientPresenter, {singleOrPlural} from "./IngredientPresenter";
import {Just, Nothing} from "purify-ts";

test("rendering ingredient text based on quantity", () => {
  const ingredientPresenter = new IngredientPresenter(buildIngredient({
    quantity: Just({value: 5})
  }));
  expect(ingredientPresenter.renderIngredientText).toEqual("5");
});

test("rendering ingredient text based on weight", () => {
  const ingredientPresenter = new IngredientPresenter(buildIngredient({
    weight: Just({value: 5.0, type: "pounds"})
  }));
  expect(ingredientPresenter.renderIngredientText).toEqual("5 lbs");
});

test("rendering ingredient text based on volume", () => {
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

describe("displayForm", () => {
  describe("when ingredient form exists", () => {
    it("returns the form in display mode", () => {
      expect(new IngredientPresenter(buildIngredient({form: Just("Chopped")}).displayForm)).toEqual("Chopped");
      expect(new IngredientPresenter(buildIngredient({form: Just("Diced")}).displayForm)).toEqual("Diced");
    });
  });

  describe("when an ingredient form does not exist", () => {
    it("returns nothing", () => {
      const ingredientPresenter = new IngredientPresenter(buildIngredient({form: Nothing}));
      expect(ingredientPresenter.displayForm).toEqual("");
    });
  });
});

test("singleOrPlural volume", () => {
  expect(singleOrPlural({value: 1, type: "tablespoon"})).toEqual("tablespoon");
  expect(singleOrPlural({value: 2, type: "tablespoon"})).toEqual("tablespoons");

  expect(singleOrPlural({value: 1, type: "teaspoon"})).toEqual("teaspoon");
  expect(singleOrPlural({value: 2, type: "teaspoon"})).toEqual("teaspoons");

  expect(singleOrPlural({value: 1, type: "cup"})).toEqual("cup");
  expect(singleOrPlural({value: 2, type: "cup"})).toEqual("cups");
})
