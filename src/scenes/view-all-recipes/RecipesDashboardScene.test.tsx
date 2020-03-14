import {render} from "@testing-library/react";
import * as React from "react";
import {FetchAllRecipesService} from "../../application/services/Services";
import RecipesDashboardScene from "./RecipesDashboardScene";
import {buildRecipe} from "../../__tests__/helpers/Builders";
import {buildComponent} from "../../__tests__/helpers/RenderApp";
import {StubFetchAllRecipesService} from "../../__tests__/test-doubles/services/StubFetchAllRecipesService";

describe("RecipesDashboardScene", () => {
  let fetchAllRecipesService: FetchAllRecipesService;
  let getAllByTestId: any;
  let getByText: any;
  let getAllByLabelText: any;

  beforeEach(() => {
    fetchAllRecipesService = new StubFetchAllRecipesService();
  });

  describe("when some recipes have loaded", () => {
    beforeEach(async () => {
      (fetchAllRecipesService as StubFetchAllRecipesService).setResolvedRecipes(() => [
        buildRecipe({name: "Great Recipe"})]);
      ({getAllByTestId, getAllByLabelText} = await render(
        buildComponent(<RecipesDashboardScene recipesService={fetchAllRecipesService}/>)));
    });

    it("should display the recipes", async () => {
      const recipesDisplayed = await getAllByLabelText("Recipe card");
      expect(recipesDisplayed).toHaveLength(1);
      expect(recipesDisplayed[0].textContent).toContain("Great Recipe");
    });
  });

  describe("when no recipes have loaded", () => {
    beforeEach(async () => {
      (fetchAllRecipesService as StubFetchAllRecipesService).setResolvedRecipes(() => []);
      ({getByText, getAllByTestId} = await render(
        buildComponent(<RecipesDashboardScene recipesService={fetchAllRecipesService}/>)));
    });

    it("should display a no recipes message", () => {
      expect(getByText("No recipes yet.")).toBeTruthy();
    });
  });
});
