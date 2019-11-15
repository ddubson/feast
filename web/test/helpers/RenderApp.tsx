import React, {ReactElement} from "react";
import {DIContainer, DIContainerContext} from "../../src/AppConfig";
import {MemoryRouter} from "react-router-dom";
import StubRecipesGateway from "../test-doubles/StubRecipesGateway";
import {StubRecipesService} from "../test-doubles/services/StubRecipesService";

const testDiContainer: DIContainer = {
  recipesGateway: new StubRecipesGateway(),
  recipesService: new StubRecipesService()
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
