import React, {ReactElement} from "react";
import {MemoryRouter} from "react-router-dom";
import {DIContainer, DIContainerContext} from "../../AppConfig";
import {StubFetchAllRecipesService} from "../test-doubles/services/StubFetchAllRecipesService";
import {StubFetchByIdRecipesService} from "../test-doubles/services/StubFetchByIdRecipesService";
import StubRecipesGateway from "../test-doubles/gateways/StubRecipesGateway";
import {emptyRecipeDetail} from "./Builders";

const testDiContainer: DIContainer = {
  recipesGateway: new StubRecipesGateway(),
  fetchAllRecipesService: new StubFetchAllRecipesService(() => []),
  fetchByIdRecipesService: new StubFetchByIdRecipesService((id) => (emptyRecipeDetail)),
};

export const buildComponent = (component: ReactElement,
                               diContainer: Partial<DIContainer> = testDiContainer) => {
  const container = {...testDiContainer, ...diContainer};

  return (
    <MemoryRouter>
      <DIContainerContext.Provider value={container}>
        {component}
      </DIContainerContext.Provider>
    </MemoryRouter>
  );
};
