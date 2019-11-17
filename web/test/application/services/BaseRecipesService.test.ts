import {BaseRecipesService} from "../../../src/application/services/BaseRecipesService";
import {RecipesGateway} from "../../../src/application/gateways/RecipesGateway";
import StubRecipesGateway from "../../test-doubles/StubRecipesGateway";
import {RecipesObserverSpy} from "../../test-doubles/observable/ObserverSpy";
import {buildRecipe} from "../../helpers/Builders";

describe("BaseRecipesService", () => {
  let stubRecipesGateway: RecipesGateway;
  let recipesService: BaseRecipesService;

  beforeEach(() => {
    stubRecipesGateway = new StubRecipesGateway();
    recipesService = new BaseRecipesService(stubRecipesGateway);
  });

  describe("when there is at least one registered observer", () => {
    let firstObserverSpy: RecipesObserverSpy;
    let secondObserverSpy: RecipesObserverSpy;

    beforeEach(() => {
      firstObserverSpy = new RecipesObserverSpy();
      secondObserverSpy = new RecipesObserverSpy();
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