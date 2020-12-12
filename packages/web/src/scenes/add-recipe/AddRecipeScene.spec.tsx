import {buildComponent} from "../../test-helpers/helpers/RenderApp";
import AddRecipeScene from "./AddRecipeScene";
import {fireEvent, render, RenderResult, waitFor} from "@testing-library/react";

test("recipe is added when user fills out form and clicks 'Add Recipe'", () => {
  const goToSceneSpy = jest.fn()
  const saveRecipeSpy = jest.fn().mockResolvedValue({});;
  const page = AddRecipeScenePage(render(buildComponent(<AddRecipeScene saveRecipe={saveRecipeSpy}
                                                                        goToScene={goToSceneSpy} />)));
  page.type("Recipe name", "Garlic Lime Shrimp");
  page.clickAddRecipe();
  waitFor(() => {
    expect(saveRecipeSpy).toHaveBeenCalledWith({name: "Garlic Lime Shrimp"});
    expect(goToSceneSpy).toHaveBeenCalledWith("/");
  })
});

const AddRecipeScenePage = (renderResult: RenderResult) => ({
  type: (ariaLabel: string, text: string) => {
    fireEvent.change(renderResult.getByLabelText(ariaLabel), {target: {value: text}});
  },
  clickAddRecipe: () => {
    fireEvent.click(renderResult.getByLabelText("Add recipe"));
  }
});
