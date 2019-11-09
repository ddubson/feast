import {buildComponent} from "../../helpers/RenderApp";
import RecipesDashboardScene from "../../../src/recipes/scenes/RecipesDashboardScene";
import {render} from "@testing-library/react";
import * as React from "react";
import StubRecipesGateway from "../../test-doubles/StubRecipesGateway";
import {buildRecipe} from "../../helpers/Builders";
import {RecipesGateway} from "../../../src/recipes/gateways/RecipesGateway";

describe("RecipesDashboardScene", () => {
  describe("when some recipes have loaded", () => {
    it("should display the recipes", async () => {
      const recipesGateway: RecipesGateway = new StubRecipesGateway();

      (recipesGateway as StubRecipesGateway).resolvedRecipes = [buildRecipe()];
      const {getAllByTestId} = await render(buildComponent(<RecipesDashboardScene/>, {
        recipesGateway
      }));

      const recipesDisplayed = await getAllByTestId("recipe");
      expect(recipesDisplayed).toHaveLength(1);
    });
  });
});