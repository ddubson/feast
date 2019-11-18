import React, {ReactElement} from "react";
import {MemoryRouter} from "react-router-dom";
import {DIContainer, DIContainerContext} from "../../src/AppConfig";
import {StubRecipesService} from "../test-doubles/services/StubRecipesService";
import StubRecipesGateway from "../test-doubles/StubRecipesGateway";

const testDiContainer: DIContainer = {
  recipesGateway: new StubRecipesGateway(),
  recipesService: new StubRecipesService(),
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
