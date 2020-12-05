import * as React from "react";
import RecipesDashboardScene from "./RecipesDashboardScene";
import {buildRecipeDetail} from "../../test-helpers/helpers/Builders";
import {buildComponent} from "../../test-helpers/helpers/RenderApp";
import {StubFetchAllRecipesService} from "../../test-helpers/test-doubles/services/StubFetchAllRecipesService";
import {render} from "@testing-library/react";

let getAllByTestId: any;
let getByText: any;

describe("when recipes have loaded successfully", () => {
  beforeEach(async () => {
    const fetchAllRecipesService = new StubFetchAllRecipesService(() => [
      buildRecipeDetail({name: "Great Recipe"})]);

    ({getByText} = render(
      buildComponent(<RecipesDashboardScene recipesService={fetchAllRecipesService} />)));
  });

  it("should display the recipes", async () => {
    expect(await getByText("Great Recipe")).toBeTruthy();
  });
});

describe("when no recipes have loaded", () => {
  beforeEach(async () => {
    const fetchAllRecipesService = new StubFetchAllRecipesService(() => []);
    ({getByText, getAllByTestId} = render(
      buildComponent(<RecipesDashboardScene recipesService={fetchAllRecipesService} />)));
  });

  it("should display a no recipes message", () => {
    expect(getByText("No recipes yet.")).toBeTruthy();
  });
});
