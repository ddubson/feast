import {buildComponent} from "../../test-helpers/helpers/RenderApp";
import AddRecipeScene from "./AddRecipeScene";
import {fireEvent, render, RenderResult, waitFor} from "@testing-library/react";
import {buildIngredient} from "../../test-helpers/helpers/Builders";
import {SaveRecipe} from "../../application/gateways/RecipesGateway";
import {Just} from "purify-ts";

test("recipe is added when user fills out form and clicks 'Add Recipe'", async () => {
  const goToSceneSpy = jest.fn()
  const saveRecipeSpy = jest.fn().mockResolvedValue({});
  const page = AddRecipeScenePage(render(buildComponent(<AddRecipeScene saveRecipe={saveRecipeSpy}
                                                                        goToScene={goToSceneSpy} />)));
  page.type("Recipe name", "Garlic Lime Shrimp");
  page.clickAddRecipe();
  await waitFor(() => {
    expect(saveRecipeSpy).toHaveBeenCalledWith({
      name: "Garlic Lime Shrimp",
      ingredients: [], steps: []
    });
    expect(goToSceneSpy).toHaveBeenCalledWith("/");
  })
});

test("user is able to save a recipe with at least one ingredient", async () => {
  const goToSceneSpy = jest.fn();
  const saveRecipeSpy: SaveRecipe = jest.fn().mockResolvedValue({});
  const page = AddRecipeScenePage(render(
    buildComponent(<AddRecipeScene goToScene={goToSceneSpy} saveRecipe={saveRecipeSpy} />)));
  page.type("Recipe name", "Garlic Lime Shrimp");
  page.clickNewIngredient();
  await waitFor(() => {
    expect(page.newIngredientSectionVisible()).toBeTruthy()
    expect(page.newIngredientButton()).toBeDisabled()
  });
  page.type("Ingredient name", "Garlic");
  page.pickFormOption("Diced");
  page.type("Quantity", "2");
  page.clickAddIngredient();
  page.clickAddRecipe();

  await waitFor(() => {
    expect(saveRecipeSpy).toHaveBeenCalledWith({
      name: "Garlic Lime Shrimp",
      ingredients: [buildIngredient({
        id: "STUB",
        name: "Garlic",
        form: Just("Diced"),
        quantity: Just({value: 2})
      })],
      steps: []
    });
    expect(page.newIngredientSectionVisible()).toBeFalsy();
    expect(page.newIngredientButton()).not.toBeDisabled();

  });
});

const AddRecipeScenePage = (renderResult: RenderResult) => ({
  type: (ariaLabel: string, text: string) => {
    fireEvent.change(renderResult.getByLabelText(ariaLabel), {target: {value: text}});
  },
  pickFormOption: (value: string) => {
    fireEvent.click(renderResult.getAllByText("e.g. Diced, Chopped, Minced, etc.")[0])
    fireEvent.click(renderResult.getByText(value));
  },
  newIngredientSectionVisible: () =>
    renderResult.queryByLabelText("Add an ingredient") !== null,
  newIngredientButton: () =>
    renderResult.getByLabelText("New ingredient"),
  clickNewIngredient: () => {
    fireEvent.click(renderResult.getByLabelText("New ingredient"));
  },
  clickAddRecipe: () => {
    fireEvent.click(renderResult.getByLabelText("Add recipe"));
  },
  clickAddIngredient: () => {
    fireEvent.click(renderResult.getByLabelText("Add ingredient"));
  }
});
