import {render} from "@testing-library/react";
import {Just, Nothing} from "purify-ts/Maybe";
import * as React from "react";
import {FetchByIdRecipesService} from "../../../src/application/services/Services";
import RecipeOverviewScene from "../../../src/recipes/scenes/RecipeOverviewScene";
import {buildRecipe} from "../../helpers/Builders";
import {buildComponent} from "../../helpers/RenderApp";
import {StubFetchByIdRecipesService} from "../../test-doubles/services/StubFetchByIdRecipesService";

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
          steps: Just({
            1: "Do this",
            2: "Do that",
          }),
          ingredients: Just([
            {
              id: "1",
              name: "An ingredient",
              form: "Chopped",
              quantity: Just({
                value: 1,
              }),
              weight: Nothing,
            },
            {
              id: "2",
              name: "Another ingredient",
              form: "Diced",
              quantity: Nothing,
              weight: Just({
                value: 2.0,
                type: "POUNDS",
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
      expect(getByText("1x An ingredient - Chopped")).toBeTruthy();
    });

    it("should display recipe ingredients with a weight", () => {
      expect(getByText("2 POUNDS Another ingredient - Diced")).toBeTruthy();
    });

    it("should display the instructions step by step section", () => {
      const instructionSet = getAllByTestId("instruction-step").map((step: Element) => step.textContent);
      expect(instructionSet).toEqual([
        "Do this",
        "Do that",
      ]);
    });
  });
});
