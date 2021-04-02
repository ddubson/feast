import {buildComponent} from "../../test-helpers/helpers/RenderApp";
import AddRecipeScene from "./AddRecipeScene";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {buildIngredient} from "../../test-helpers/helpers/Builders";
import {SaveRecipe} from "../../application/gateways/RecipesGateway";
import {Just, Nothing} from "purify-ts";
import {Ingredient, WithoutId} from "@ddubson/feast-domain";
import capitalize from "lodash.capitalize";

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

test("user is able to save a recipe with at least one ingredient measured in units of quantity", async () => {
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

    page.addIngredientQuantityFor(ingredient);
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

test("user is able to save a recipe with at least one ingredient measured in volume", async () => {
  const ingredient1 = buildIngredient({
    name: "Flour",
    form: Nothing,
    quantity: Nothing,
    volume: Just({
      value: 2,
      type: "cup"
    })
  });
  const ingredient2 = buildIngredient({
    name: "Potato",
    form: Just("Diced"),
    quantity: Just({value: 4}),
  });
  const goToSceneSpy = jest.fn();
  const saveRecipeSpy: SaveRecipe = jest.fn().mockResolvedValue({});
  const page = AddRecipeScenePage(goToSceneSpy, saveRecipeSpy);

  page.type("Recipe name", "Pancakes");

  const addAnIngredient = async (ingredient: WithoutId<Ingredient>) => {
    page.clickNewIngredient();
    await waitFor(() => {
      expect(page.newIngredientSectionVisible()).toBeTruthy()
      expect(page.newIngredientButton()).toBeDisabled()
    });

    if (ingredient.quantity.isJust()) {
      page.addIngredientQuantityFor(ingredient);
    } else if (ingredient.volume.isJust()) {
      page.addIngredientVolumeFor(ingredient);
    }
  }

  await addAnIngredient(ingredient1);
  await addAnIngredient(ingredient2);
  page.clickAddRecipe();

  await waitFor(() => {
    expect(page.newIngredientSectionVisible()).toBeFalsy();
    expect(page.newIngredientButton()).not.toBeDisabled();
    expect(page.ingredientsDisplayed()).toEqual([
      "2 cups of Flour",
      "4x Potato, Chopped"
    ])
    expect(saveRecipeSpy).toHaveBeenCalledWith({
      name: "Pancakes",
      ingredients: [buildIngredient({
        id: "STUB",
        name: "Flour",
        form: Nothing,
        quantity: Nothing,
        volume: Just({
          value: 2,
          type: "cup"
        })
      }), buildIngredient({
        id: "STUB",
        name: "Potato",
        form: Just("Diced"),
        quantity: Just({value: 4})
      })],
      steps: []
    });
  });
});

const AddRecipeScenePage = (goToSceneSpy: (location: string) => void, saveRecipeSpy: SaveRecipe) => {
  const renderResult = render(
    buildComponent(<AddRecipeScene goToScene={goToSceneSpy} saveRecipe={saveRecipeSpy}/>))
  const type = (ariaLabel: string, text: string | number) => {
    fireEvent.change(renderResult.getByLabelText(ariaLabel,
      {selector: "input"}),
      {target: {value: text}});
  };
  const pickUnitOfMeasure = (value: string) => {
    fireEvent.click(renderResult.getByText("e.g. Weight, Quantity, etc.", {selector: "option"}))
    fireEvent.click(renderResult.getByText(value, {selector: ".p-dropdown-item", exact: true}));
  };
  const pickFormOption = (value: string) => {
    fireEvent.click(renderResult.getByText("e.g. Diced, Chopped, Minced, etc.", {selector: "option"}))
    fireEvent.click(renderResult.getByText(value));
  };
  const pickOtherFormOption = (value: string) => {
    fireEvent.click(renderResult.getByText("e.g. Tablespoons, Cups, etc.", {selector: "option"}))
    fireEvent.click(renderResult.getByText(value));
  };
  const clickAddIngredient = () => {
    fireEvent.click(renderResult.getByLabelText("Add ingredient"));
  };

  return ({
    type,
    pickFormOption,
    pickUnitOfMeasure,
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
    addIngredientQuantityFor: (ingredient: WithoutId<Ingredient>) => {
      type("Ingredient name", ingredient.name);
      ingredient.form.ifJust((value) => pickFormOption(value));
      pickUnitOfMeasure("Quantity");
      type("Quantity", ingredient.quantity.extract().value);
      clickAddIngredient();
    },
    addIngredientVolumeFor: (ingredient: WithoutId<Ingredient>) => {
      type("Ingredient name", ingredient.name);
      pickUnitOfMeasure("Volume");
      type("Amount", ingredient.volume.extract().value);
      pickOtherFormOption(capitalize(ingredient.volume.extract().type));
      clickAddIngredient();
    }
  });
};
