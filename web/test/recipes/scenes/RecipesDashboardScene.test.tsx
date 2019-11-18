import {render} from "@testing-library/react";
import * as React from "react";
import {RecipesService} from "../../../src/application/services/RecipesService";
import RecipesDashboardScene from "../../../src/recipes/scenes/RecipesDashboardScene";
import {buildRecipe} from "../../helpers/Builders";
import {buildComponent} from "../../helpers/RenderApp";
import {StubRecipesService} from "../../test-doubles/services/StubRecipesService";

describe("RecipesDashboardScene", () => {
  let recipesService: RecipesService;
  let getAllByTestId: any;
  let getByText: any;

  beforeEach(() => {
    recipesService = new StubRecipesService();
  });

  describe("when some recipes have loaded", () => {
    beforeEach(async () => {
      (recipesService as StubRecipesService).setResolvedRecipes(() => [buildRecipe()]);
      ({getAllByTestId} = await render(
        buildComponent(<RecipesDashboardScene recipesService={recipesService}/>)));
    });

    it("should display the recipes", async () => {
      const recipesDisplayed = await getAllByTestId("recipe");
      expect(recipesDisplayed).toHaveLength(1);
    });
  });

  describe("when no recipes have loaded", () => {
    beforeEach(async () => {
      (recipesService as StubRecipesService).setResolvedRecipes(() => []);
      ({getByText, getAllByTestId} = await render(
        buildComponent(<RecipesDashboardScene recipesService={recipesService}/>)));
    });

    it("should display a no recipes message", () => {
      expect(getByText("No recipes yet.")).toBeTruthy();
    });
  });
});
