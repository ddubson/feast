import * as React from "react";
import {buildIngredient, buildRecipeDetail} from "../../test-helpers/helpers/Builders";
import {buildComponent} from "../../test-helpers/helpers/RenderApp";
import {textsOf} from "../../test-helpers/helpers/TestExtensions";
import ViewRecipe from "./ViewRecipe";
import {Just, Nothing} from "purify-ts";
import {fireEvent, render, RenderResult, waitFor} from "@testing-library/react";
import {RecipeDetail} from "@ddubson/feast-domain";

test("recipe loads successfully", async () => {
  const deps = dependencies(sampleRecipeDetail);
  const {getByLabelText, getAllByLabelText, getAllByTestId} = render(buildComponent(
    <ViewRecipe findRecipeById={deps.findRecipeByIdSpy}
                deleteRecipe={deps.deleteRecipeSpy}
                goToScene={deps.goToSceneSpy}
                recipeId={deps.recipeId} />));

  await waitFor(() => {
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

test("user is able to delete the recipe they are viewing", async () => {
  const deps = dependencies(sampleRecipeDetail);
  const page = ViewRecipePage(render(buildComponent(
    <ViewRecipe findRecipeById={deps.findRecipeByIdSpy} deleteRecipe={deps.deleteRecipeSpy}
                goToScene={deps.goToSceneSpy} recipeId={deps.recipeId} />)));

  page.clickDeleteRecipe();

  await waitFor(() => {
    expect(deps.deleteRecipeSpy).toHaveBeenCalledWith(deps.recipeId);
    expect(deps.goToSceneSpy).toHaveBeenCalledWith("/")
  });
});

const ViewRecipePage = (renderResult: RenderResult) => ({
  clickDeleteRecipe: () => {
    fireEvent.click(renderResult.getByLabelText("Delete forever"));
  }
});

const dependencies = (recipeDetail: RecipeDetail) => ({
  recipeId: "123",
  goToSceneSpy: jest.fn(),
  deleteRecipeSpy: jest.fn().mockResolvedValue({}),
  findRecipeByIdSpy: jest.fn().mockResolvedValue(recipeDetail),
});

const sampleRecipeDetail = buildRecipeDetail({
  name: "Great Recipe",
  steps: Just([
    {stepNumber: 1, value: "Do this"},
    {stepNumber: 2, value: "Do that"},
  ]),
  ingredients: Just([
    buildIngredient({
      id: "1",
      name: "An ingredient",
      form: Just("Chopped"),
      quantity: Just({
        value: 1,
      })
    }),
    buildIngredient({
      id: "2",
      name: "Another ingredient",
      form: Just("Diced"),
      weight: Just({
        value: 2.0,
        type: "pounds",
      }),
    }),
    buildIngredient({
      id: "3",
      name: "Yet Another Ingredient",
      form: Nothing,
      volume: Just({
        value: 2,
        type: "tablespoon",
      }),
    }),
  ]),
});
