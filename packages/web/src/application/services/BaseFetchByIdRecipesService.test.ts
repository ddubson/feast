import {RecipesGateway} from "../gateways/RecipesGateway";
import {buildRecipeDetail} from "../../__tests__/helpers/Builders";
import {FetchByIdRecipesObserverSpy} from "../../__tests__/test-doubles/observable/FetchByIdRecipesObserverSpy";
import StubRecipesGateway from "../../__tests__/test-doubles/gateways/StubRecipesGateway";
import {BaseFetchByIdRecipesService} from "./BaseFetchByIdRecipesService";

describe("BaseFetchByIdRecipesService", () => {
  describe("data has been received when there is at least one registered observer", () => {
    let stubRecipesGateway: RecipesGateway;
    let fetchByIdRecipesService: BaseFetchByIdRecipesService;
    let firstObserverSpy: FetchByIdRecipesObserverSpy;
    let secondObserverSpy: FetchByIdRecipesObserverSpy;
    const recipe = buildRecipeDetail({id: "123"});

    beforeEach(() => {
      stubRecipesGateway = new StubRecipesGateway(undefined, recipe);
      fetchByIdRecipesService = new BaseFetchByIdRecipesService(stubRecipesGateway);
      firstObserverSpy = new FetchByIdRecipesObserverSpy();
      secondObserverSpy = new FetchByIdRecipesObserverSpy();
      fetchByIdRecipesService.registerObserver(firstObserverSpy);
      fetchByIdRecipesService.registerObserver(secondObserverSpy);
      fetchByIdRecipesService.dispatch("123");
    });

    it("should notify all observers that there is a recipe", () => {
      expect(firstObserverSpy.receivedRecipeWasCalled).toBeTruthy();
      expect(firstObserverSpy.recipeReceived).toEqual(recipe);
      expect(secondObserverSpy.receivedRecipeWasCalled).toBeTruthy();
      expect(secondObserverSpy.recipeReceived).toEqual(recipe);
    });
  });

  describe("when an observer unregisters", () => {
    const anotherRecipe = buildRecipeDetail({id: "456"});
    let stubRecipesGateway: RecipesGateway;
    let fetchByIdRecipesService: BaseFetchByIdRecipesService;
    let firstObserverSpy: FetchByIdRecipesObserverSpy;
    let secondObserverSpy: FetchByIdRecipesObserverSpy;

    beforeEach(() => {
      stubRecipesGateway = new StubRecipesGateway(undefined, anotherRecipe);
      fetchByIdRecipesService = new BaseFetchByIdRecipesService(stubRecipesGateway);

      firstObserverSpy.resetSpy();
      secondObserverSpy.resetSpy();
      fetchByIdRecipesService.unregisterObserver(secondObserverSpy);
      fetchByIdRecipesService.dispatch("456");
    });

    it("should notify registered observers", () => {
      expect(firstObserverSpy.receivedRecipeWasCalled).toBeTruthy();
      expect(firstObserverSpy.recipeReceived).toEqual(anotherRecipe);
    });

    it("should not notify unregistered observers", () => {
      expect(secondObserverSpy.receivedRecipeWasCalled).toBeFalsy();
    });
  });
});
