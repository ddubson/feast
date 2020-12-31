import {buildComponent} from "../../test-helpers/helpers/RenderApp";
import AddRecipeScene from "./AddRecipeScene";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {buildIngredient} from "../../test-helpers/helpers/Builders";
import {SaveRecipe} from "../../application/gateways/RecipesGateway";
import {Just} from "purify-ts";
import {Ingredient, WithoutId} from "@ddubson/feast-domain";

test("recipe is added when user fills out form and clicks 'Add Recipe'", async () => {
  const goToSceneSpy = jest.fn()
  const saveRecipeSpy = jest.fn().mockResolvedValue({});
  const page = AddRecipeScenePage(goToSceneSpy, saveRecipeSpy);

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

test("user is able to save a recipe with at least one ingredient with a quantity unit of measure", async () => {
  const ingredient1 = buildIngredient({
    name: "Garlic",
    form: Just("Diced"),
    quantity: Just({value: 2}),
  });
  const ingredient2 = buildIngredient({
    name: "Potato",
    form: Just("Chopped"),
    quantity: Just({value: 3}),
  });
  const goToSceneSpy = jest.fn();
  const saveRecipeSpy: SaveRecipe = jest.fn().mockResolvedValue({});
  const page = AddRecipeScenePage(goToSceneSpy, saveRecipeSpy);

  page.type("Recipe name", "Garlic Lime Shrimp");

  const addAnIngredient = async (ingredient: WithoutId<Ingredient>) => {
    page.clickNewIngredient();
    await waitFor(() => {
      expect(page.newIngredientSectionVisible()).toBeTruthy()
      expect(page.newIngredientButton()).toBeDisabled()
    });

    page.type("Ingredient name", ingredient.name);
    page.pickFormOption(ingredient.form.extract());
    page.pickUnitOfMeasure("Quantity");
    page.type("Quantity", ingredient.quantity.extract().value);
    page.clickAddIngredient();
  }

  await addAnIngredient(ingredient1);
  await addAnIngredient(ingredient2);
  page.clickAddRecipe();

  await waitFor(() => {
    expect(page.newIngredientSectionVisible()).toBeFalsy();
    expect(page.newIngredientButton()).not.toBeDisabled();
    expect(page.ingredientsDisplayed()).toEqual([
      "2x Garlic, Diced",
      "3x Potato, Chopped"
    ])
    expect(saveRecipeSpy).toHaveBeenCalledWith({
      name: "Garlic Lime Shrimp",
      ingredients: [buildIngredient({
        id: "STUB",
        name: "Garlic",
        form: Just("Diced"),
        quantity: Just({value: 2})
      }), buildIngredient({
        id: "STUB",
        name: "Potato",
        form: Just("Chopped"),
        quantity: Just({value: 3})
      })],
      steps: []
    });
  });
});

const AddRecipeScenePage = (goToSceneSpy: (location: string) => void, saveRecipeSpy: SaveRecipe) => {
  const renderResult = render(
    buildComponent(<AddRecipeScene goToScene={goToSceneSpy} saveRecipe={saveRecipeSpy} />))
  return ({
    type: (ariaLabel: string, text: string | number) => {
      fireEvent.change(renderResult.getByLabelText(ariaLabel,
        {selector: "input"}),
        {target: {value: text}});
    },
    pickFormOption: (value: string) => {
      fireEvent.click(renderResult.getByText("e.g. Diced, Chopped, Minced, etc.", {selector: "option"}))
      fireEvent.click(renderResult.getByText(value));
    },
    pickUnitOfMeasure: (value: string) => {
      fireEvent.click(renderResult.getByText("e.g. Weight, Quantity, etc.", {selector: "option"}))
      fireEvent.click(renderResult.getByText(value, {selector: ".p-dropdown-item", exact: true}));
    },
    ingredientsDisplayed: () => renderResult.getAllByLabelText("ingredient").map(i => i.textContent),
    newIngredientSectionVisible: () =>
      renderResult.queryByText("Add an ingredient", {selector: "h3"}) !== null,
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
    },
    html: () => renderResult.container.innerHTML
  });
};
