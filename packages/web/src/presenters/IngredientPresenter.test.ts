import {buildIngredient} from "../test-helpers/helpers/Builders";
import IngredientPresenter, {singleOrPlural} from "./IngredientPresenter";
import {Just, Nothing} from "purify-ts";

describe("IngredientPresenter", () => {
  let ingredientPresenter: IngredientPresenter;

  describe("displayIngredientMeasure", () => {
    describe("when an ingredient is based off of quantity", () => {
      beforeEach(() => {
        ingredientPresenter = new IngredientPresenter(buildIngredient({
          quantity: Just({value: 5}), weight: Nothing, volume: Nothing,
        }));
      });
      it("is displayed as that quantity", () => {
        expect(ingredientPresenter.displayCulinaryMeasure).toEqual("5");
      });
    });

    describe("when an ingredient is based off of weight", () => {
      beforeEach(() => {
        ingredientPresenter = new IngredientPresenter(buildIngredient({
          quantity: Nothing, weight: Just({value: 5.0, type: "pounds"}), volume: Nothing,
        }));
      });

      it("is displayed as weight with a type", () => {
        expect(ingredientPresenter.displayCulinaryMeasure).toEqual("5 lbs");
      });
    });

    describe("when an ingredient is based off of volume", () => {
      beforeEach(() => {
        ingredientPresenter = new IngredientPresenter(buildIngredient({
          quantity: Nothing, weight: Nothing, volume: Just({value: 2, type: "tablespoon"}),
        }));
      });

      it("is displayed as the number of volumetric units", () => {
        expect(ingredientPresenter.displayCulinaryMeasure).toEqual("2 tablespoons");
      });
    });
  });

  describe("displayForm", () => {
    describe("when ingredient form exists", () => {
      beforeEach(() => {
        ingredientPresenter = new IngredientPresenter(buildIngredient({form: Just("Chopped")}));
      });

      it("returns the form in display mode", () => {
        expect(ingredientPresenter.displayForm).toEqual("Chopped");
      });
    });

    describe("when an ingredient form does not exist", () => {
      beforeEach(() => {
        ingredientPresenter = new IngredientPresenter(buildIngredient({form: Nothing}));
      });

      it("returns nothing", () => {
        expect(ingredientPresenter.displayForm).toEqual("");
      });
    });
  });
});

test("singleOrPlural", () => {
  expect(singleOrPlural({value: 1, type: "tablespoon"})).toEqual("tablespoon");
  expect(singleOrPlural({value: 2, type: "tablespoon"})).toEqual("tablespoons");
})
