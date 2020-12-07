import * as React from "react";
import ViewAllRecipes from "./ViewAllRecipes";
import {buildRecipe} from "../../test-helpers/helpers/Builders";
import {buildComponent} from "../../test-helpers/helpers/RenderApp";
import {render, waitFor} from "@testing-library/react";
import StubRecipesGateway from "../../test-helpers/test-doubles/gateways/StubRecipesGateway";

test("all recipes load successfully", async () => {
  const stubRecipesGateway = new StubRecipesGateway([
    buildRecipe({name: "Great Recipe"})]);

  const {getByText} = render(
    buildComponent(<ViewAllRecipes recipesGateway={stubRecipesGateway} />));

  await waitFor(() => {
    expect(getByText("Great Recipe")).toBeTruthy();
  });
});

test("displays 'No Recipes yet' when no recipes are available", async () => {
  const recipesGateway = new StubRecipesGateway([]);
  const {getByText} = render(
    buildComponent(<ViewAllRecipes recipesGateway={recipesGateway} />));

  await waitFor(() => {
    expect(getByText("No recipes yet.")).toBeTruthy();
  })
});
