import {RecipesGateway} from "../gateways/RecipesGateway";
import {BaseFetchAllRecipesService} from "./BaseFetchAllRecipesService";
import {buildRecipe} from "../../__tests__/helpers/Builders";
import {FetchAllRecipesObserverSpy} from "../../__tests__/test-doubles/observable/FetchAllRecipesObserverSpy";
import StubRecipesGateway from "../../__tests__/test-doubles/gateways/StubRecipesGateway";

describe("BaseFetchAllRecipesService", () => {
  let stubRecipesGateway: RecipesGateway;
  let recipesService: BaseFetchAllRecipesService;

  beforeEach(() => {
    stubRecipesGateway = new StubRecipesGateway();
    recipesService = new BaseFetchAllRecipesService(stubRecipesGateway);
  });

  describe("when there is at least one registered observer", () => {
    let firstObserverSpy: FetchAllRecipesObserverSpy;
    let secondObserverSpy: FetchAllRecipesObserverSpy;

    beforeEach(() => {
      firstObserverSpy = new FetchAllRecipesObserverSpy();
      secondObserverSpy = new FetchAllRecipesObserverSpy();
      recipesService.registerObserver(firstObserverSpy);
      recipesService.registerObserver(secondObserverSpy);
    });

    describe("and data has been received", () => {
      const recipes = [buildRecipe()];

      beforeEach(() => {
        (stubRecipesGateway as StubRecipesGateway).resolvedRecipes = recipes;
        recipesService.dispatch();
      });

      it("should notify all observers that there are recipes", () => {
        expect(firstObserverSpy.receivedRecipesWasCalled).toBeTruthy();
        expect(firstObserverSpy.recipesReceived).toEqual(recipes);

        expect(secondObserverSpy.receivedRecipesWasCalled).toBeTruthy();
        expect(secondObserverSpy.recipesReceived).toEqual(recipes);
      });

      describe("when an observer unregisters", () => {
        beforeEach(() => {
          firstObserverSpy.resetSpy();
          secondObserverSpy.resetSpy();
          recipesService.unregisterObserver(secondObserverSpy);
        });

        describe("and more data is received", () => {
          const moreRecipes = [buildRecipe(), buildRecipe()];

          beforeEach(() => {
            (stubRecipesGateway as StubRecipesGateway).resolvedRecipes = moreRecipes;
            recipesService.dispatch();
          });

          it("should notify registered observers", () => {
            expect(firstObserverSpy.receivedRecipesWasCalled).toBeTruthy();
            expect(firstObserverSpy.recipesReceived).toEqual(moreRecipes);
          });

          it("should not notify unregistered observers", () => {
            expect(secondObserverSpy.receivedRecipesWasCalled).toBeFalsy();
          });
        });
      });
    });
  });
});
