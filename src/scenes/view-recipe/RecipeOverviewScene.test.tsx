import {render} from "@testing-library/react";
import {Just, Nothing} from "purify-ts/Maybe";
import * as React from "react";
import {buildRecipeDetail} from "../../__tests__/helpers/Builders";
import {buildComponent} from "../../__tests__/helpers/RenderApp";
import {textsOf} from "../../__tests__/helpers/TestExtensions";
import {StubFetchByIdRecipesService} from "../../__tests__/test-doubles/services/StubFetchByIdRecipesService";
import {FetchByIdRecipesService} from "../../application/services/Services";
import RecipeOverviewScene from "./RecipeOverviewScene";
import { Volumes } from "../../application/Volumes";

describe("RecipeOverviewScene", () => {
  let getByText: any;
  let getByLabelText: any;
  let getAllByLabelText: any;
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
        buildRecipeDetail({
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

      ({getByText, getByLabelText, getAllByLabelText, getAllByTestId} = await render(buildComponent(
          <RecipeOverviewScene fetchByIdRecipesService={fetchByIdRecipesService} {...routeProps} />))
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
  })
  ;
});
