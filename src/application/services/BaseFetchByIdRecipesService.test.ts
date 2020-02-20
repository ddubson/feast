import {RecipesGateway} from "../gateways/RecipesGateway";
import {buildRecipe} from "../../__tests__/helpers/Builders";
import {FetchByIdRecipesObserverSpy} from "../../__tests__/test-doubles/observable/FetchByIdRecipesObserverSpy";
import StubRecipesGateway from "../../__tests__/test-doubles/gateways/StubRecipesGateway";
import {BaseFetchByIdRecipesService} from "./BaseFetchByIdRecipesService";

describe("BaseFetchByIdRecipesService", () => {
  let stubRecipesGateway: RecipesGateway;
  let fetchByIdRecipesService: BaseFetchByIdRecipesService;

  beforeEach(() => {
    stubRecipesGateway = new StubRecipesGateway();
    fetchByIdRecipesService = new BaseFetchByIdRecipesService(stubRecipesGateway);
  });

  describe("when there is at least one registered observer", () => {
    let firstObserverSpy: FetchByIdRecipesObserverSpy;
    let secondObserverSpy: FetchByIdRecipesObserverSpy;

    beforeEach(() => {
      firstObserverSpy = new FetchByIdRecipesObserverSpy();
      secondObserverSpy = new FetchByIdRecipesObserverSpy();
      fetchByIdRecipesService.registerObserver(firstObserverSpy);
      fetchByIdRecipesService.registerObserver(secondObserverSpy);
    });

    describe("and data has been received", () => {
      const recipe = buildRecipe({ id: "123" });

      beforeEach(() => {
        (stubRecipesGateway as StubRecipesGateway).resolvedRecipe = recipe;
        fetchByIdRecipesService.dispatch("123");
      });

      it("should notify all observers that there is a recipe", () => {
        expect(firstObserverSpy.receivedRecipeWasCalled).toBeTruthy();
        expect(firstObserverSpy.recipeReceived).toEqual(recipe);

        expect(secondObserverSpy.receivedRecipeWasCalled).toBeTruthy();
        expect(secondObserverSpy.recipeReceived).toEqual(recipe);
      });

      describe("when an observer unregisters", () => {
        beforeEach(() => {
          firstObserverSpy.resetSpy();
          secondObserverSpy.resetSpy();
          fetchByIdRecipesService.unregisterObserver(secondObserverSpy);
        });

        describe("and more data is received", () => {
          const anotherRecipe = buildRecipe({ id: "456" });

          beforeEach(() => {
            (stubRecipesGateway as StubRecipesGateway).resolvedRecipe = anotherRecipe;
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
    });
  });
});
