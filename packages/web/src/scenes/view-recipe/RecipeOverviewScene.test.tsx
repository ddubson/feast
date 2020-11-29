import * as React from "react";
import {buildRecipeDetail} from "../../test-helpers/helpers/Builders";
import {buildComponent} from "../../test-helpers/helpers/RenderApp";
import {textsOf} from "../../test-helpers/helpers/TestExtensions";
import {StubFetchByIdRecipesService} from "../../test-helpers/test-doubles/services/StubFetchByIdRecipesService";
import {FetchByIdRecipesService} from "../../application/services/Services";
import RecipeOverviewScene from "./RecipeOverviewScene";
import {Volumes} from "@feast/domain";
import {Just, Nothing} from "purify-ts";
import {render} from "@testing-library/react";

describe("RecipeOverviewScene", () => {
  let getByText: any;
  let getByLabelText: any;
  let getAllByLabelText: any;
  let getAllByTestId: any;

  describe("when a recipe has loaded successfully", () => {
    const recipeId = "123";
    let fetchByIdRecipesService: FetchByIdRecipesService;

    beforeEach(async () => {
      fetchByIdRecipesService = new StubFetchByIdRecipesService(() => buildRecipeDetail({
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

      ({getByText, getByLabelText, getAllByLabelText, getAllByTestId} = render(buildComponent(
          <RecipeOverviewScene fetchByIdRecipesService={fetchByIdRecipesService} recipeId={recipeId} />))
      );
    });

    it("should display recipe name", () => {
      expect(getByLabelText("Recipe name").textContent).toEqual("Great Recipe");
    });

    it("should display recipe ingredients with a quantity", () => {
      expect(textsOf(getAllByLabelText("Recipe ingredient"))).toContain("1 An ingredient - Chopped");
    });

    it("should display recipe ingredients with a weight", () => {
      expect(textsOf(getAllByLabelText("Recipe ingredient"))).toContain("2 lbs Another ingredient - Diced");
    });

    it("should display recipe ingredient with a measure of volume", () => {
      expect(textsOf(getAllByLabelText("Recipe ingredient"))).toContain("2 tablespoons Yet Another Ingredient ");
    });

    it("should display the instructions step by step section", () => {
      const instructionSet = textsOf(getAllByTestId("instruction-step"));
      expect(instructionSet).toEqual([
        "1: Do this",
        "2: Do that",
      ]);
    });
  });
});
