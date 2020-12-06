import * as React from "react";
import {buildRecipeDetail} from "../../test-helpers/helpers/Builders";
import {buildComponent} from "../../test-helpers/helpers/RenderApp";
import {textsOf} from "../../test-helpers/helpers/TestExtensions";
import RecipeOverviewScene from "./RecipeOverviewScene";
import {Volumes} from "@feast/domain";
import {Just, Nothing} from "purify-ts";
import {render, waitFor} from "@testing-library/react";
import StubRecipesGateway from "../../test-helpers/test-doubles/gateways/StubRecipesGateway";
import {RecipesGateway} from "../../application/gateways/RecipesGateway";

test("recipe loads successfully", () => {
  let getByText, getByLabelText, getAllByLabelText, getAllByTestId;
  const recipeId = "123";
  let stubRecipesGateway: RecipesGateway;
  stubRecipesGateway = new StubRecipesGateway(null, buildRecipeDetail({
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

  ({getByLabelText, getAllByLabelText, getAllByTestId} = render(buildComponent(
      <RecipeOverviewScene recipesGateway={stubRecipesGateway} recipeId={recipeId} />))
  );

  waitFor(() => {
    expect(getByLabelText("Recipe name").textContent).toEqual("Great Recipe");
    expect(textsOf(getAllByLabelText("Recipe ingredient"))).toContain("1 An ingredient - Chopped");
    expect(textsOf(getAllByLabelText("Recipe ingredient"))).toContain("2 lbs Another ingredient - Diced");
    expect(textsOf(getAllByLabelText("Recipe ingredient"))).toContain("2 tablespoons Yet Another Ingredient ");
    const instructionSet = textsOf(getAllByTestId("instruction-step"));
    expect(instructionSet).toEqual([
      "1: Do this",
      "2: Do that",
    ]);
  })
});
