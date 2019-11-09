import React, {ReactElement} from "react";
import {DIContainer, DIContainerContext} from "../../src/AppConfig";
import {HttpRecipesGateway} from "../../src/recipes/gateways/HttpRecipesGateway";
import { MemoryRouter } from "react-router-dom";

const testDiContainer: DIContainer = {
  recipesGateway: new HttpRecipesGateway()
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
