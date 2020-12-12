import {buildComponent} from "../../test-helpers/helpers/RenderApp";
import AddRecipeScene from "./AddRecipeScene";
import {fireEvent, render, RenderResult} from "@testing-library/react";

test("recipe is added when user fills out form and clicks 'Add Recipe'", () => {
  const goToSceneSpy = jest.fn();
  const page = AddRecipeScenePage(render(buildComponent(<AddRecipeScene goToScene={goToSceneSpy} />)));
  page.type("Recipe name", "Garlic Lime Shrimp");
  page.clickAddRecipe();
  expect(goToSceneSpy).toHaveBeenCalledWith("/");
});

const AddRecipeScenePage = (renderResult: RenderResult) => ({
  type: (ariaLabel: string, text: string) => {
    fireEvent.change(renderResult.getByLabelText(ariaLabel), { target: { value: text }});
  },
  clickAddRecipe: () => {
    fireEvent.click(renderResult.getByLabelText("Add recipe"));
  }
});
