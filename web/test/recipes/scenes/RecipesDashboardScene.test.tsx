import {buildComponent} from "../../helpers/RenderApp";
import RecipesDashboardScene from "../../../src/recipes/scenes/RecipesDashboardScene";
import {render} from "@testing-library/react";
import * as React from "react";
import StubRecipesGateway from "../../test-doubles/StubRecipesGateway";
import {buildRecipe} from "../../helpers/Builders";
import {RecipesGateway} from "../../../src/recipes/gateways/RecipesGateway";
import {RecipesService} from "../../../src/recipes/services/RecipesService";
import {StubRecipesService} from "../../test-doubles/services/StubRecipesService";

describe("RecipesDashboardScene", () => {
  let recipesService: RecipesService;
  let getAllByTestId: any;

  beforeEach(() => {
    recipesService = new StubRecipesService();
  });

  describe("when some recipes have loaded", () => {
    beforeEach(async () => {
      (recipesService as StubRecipesService).setResolvedRecipes(() => [buildRecipe()]);
      ({getAllByTestId} = await render(buildComponent(<RecipesDashboardScene/>, {
        recipesService
      })));
    });

    it("should display the recipes", async () => {
      const recipesDisplayed = await getAllByTestId("recipe");
      expect(recipesDisplayed).toHaveLength(1);
    });
  });
});