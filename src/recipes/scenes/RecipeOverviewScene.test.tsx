import {render} from "@testing-library/react";
import {Just, Nothing} from "purify-ts/Maybe";
import * as React from "react";
import {FetchByIdRecipesService} from "../../application/services/Services";
import {Volumes} from "../../application/Volumes";
import RecipeOverviewScene from "./RecipeOverviewScene";
import {buildRecipe} from "../../__tests__/helpers/Builders";
import {buildComponent} from "../../__tests__/helpers/RenderApp";
import {StubFetchByIdRecipesService} from "../../__tests__/test-doubles/services/StubFetchByIdRecipesService";

describe("RecipeOverviewScene", () => {
  let getByText: any;
  let getAllByTestId: any;
  let fetchByIdRecipesService: FetchByIdRecipesService;

  beforeEach(() => {
    fetchByIdRecipesService = new StubFetchByIdRecipesService();
  });

  describe("when a recipe has loaded successfully", () => {
    beforeEach(async () => {
      const recipeId = "123";
      const routeProps: any = {
        history: undefined,
        location: undefined,
        match: {params: {id: recipeId}},
      };

      (fetchByIdRecipesService as StubFetchByIdRecipesService).setResolvedRecipe(() =>
        buildRecipe({
          name: "Great Recipe",
          steps: Just([
            {stepNumber: 1, value: "Do this"},
            {stepNumber: 2, value: "Do that"},
          ]),
          ingredients: Just([
            {
              id: "1",
              name: "An ingredient",
              form: Just("Chopped"),
              quantity: Just({
                value: 1,
              }),
              weight: Nothing,
              volume: Nothing,
            },
            {
              id: "2",
              name: "Another ingredient",
              form: Just("Diced"),
              quantity: Nothing,
              weight: Just({
                value: 2.0,
                type: "POUNDS",
              }),
              volume: Nothing,
            },
            {
              id: "3",
              name: "Yet Another Ingredient",
              form: Nothing,
              quantity: Nothing,
              weight: Nothing,
              volume: Just({
                value: 2,
                volumeType: Volumes.tablespoon,
              }),
            },
          ]),
        }));

      ({getByText, getAllByTestId} = await render(buildComponent(
          <RecipeOverviewScene fetchByIdRecipesService={fetchByIdRecipesService} {...routeProps} />))
      );
    });

    it("should display recipe name", () => {
      expect(getByText("Great Recipe")).toBeTruthy();
    });

    it("should display recipe ingredients with a quantity", () => {
      expect(getByText("1 An ingredient - Chopped")).toBeTruthy();
    });

    it("should display recipe ingredients with a weight", () => {
      expect(getByText("2 lbs Another ingredient - Diced")).toBeTruthy();
    });

    it("should display recipe ingredient with a measure of volume", () => {
      expect(getByText("2 tablespoons Yet Another Ingredient")).toBeTruthy();
    });

    it("should display the instructions step by step section", () => {
      const instructionSet = getAllByTestId("instruction-step").map((step: Element) => step.textContent);
      expect(instructionSet).toEqual([
        "1: Do this",
        "2: Do that",
      ]);
    });
  });
});
