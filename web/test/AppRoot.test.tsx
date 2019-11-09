import React from "react";
import AppRoot from "../src/AppRoot";
import {render} from "@testing-library/react";
import {HttpRecipesGateway} from "../src/recipes/gateways/HttpRecipesGateway";
import {DIContainer, DIContainerContext} from "../src/AppConfig";

const testDiContainer: DIContainer = {
  recipeGateway: new HttpRecipesGateway()
};

describe("AppRoot", () => {
  it("should display the app title", () => {
    const { getByText } = render(
      <DIContainerContext.Provider value={testDiContainer}>
        <AppRoot />
      </DIContainerContext.Provider>
    );
    expect(getByText("Feast")).toBeTruthy();
  });
});
