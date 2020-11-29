import {RecipesGateway} from "../gateways/RecipesGateway";
import {BaseFetchAllRecipesService} from "./BaseFetchAllRecipesService";
import {buildRecipeDetail} from "../../test-helpers/helpers/Builders";
import {FetchAllRecipesObserverSpy} from "../../test-helpers/test-doubles/observable/FetchAllRecipesObserverSpy";
import StubRecipesGateway from "../../test-helpers/test-doubles/gateways/StubRecipesGateway";

describe("data has been received when there is at least one registered observer", () => {
  const recipes = [buildRecipeDetail()];
  let stubRecipesGateway: RecipesGateway;
  let firstObserverSpy: FetchAllRecipesObserverSpy;
  let secondObserverSpy: FetchAllRecipesObserverSpy;
  let recipesService: BaseFetchAllRecipesService;

  beforeEach(() => {
    stubRecipesGateway = new StubRecipesGateway(recipes);
    recipesService = new BaseFetchAllRecipesService(stubRecipesGateway);

    firstObserverSpy = new FetchAllRecipesObserverSpy();
    secondObserverSpy = new FetchAllRecipesObserverSpy();
    recipesService.registerObserver(firstObserverSpy);
    recipesService.registerObserver(secondObserverSpy);
    recipesService.dispatch();
  });

  it("should notify all observers that there are recipes", () => {
    expect(firstObserverSpy.receivedRecipesWasCalled).toBeTruthy();
    expect(firstObserverSpy.recipesReceived).toEqual(recipes);

    expect(secondObserverSpy.receivedRecipesWasCalled).toBeTruthy();
    expect(secondObserverSpy.recipesReceived).toEqual(recipes);
  });
});

describe("data has been received but some observers have detached", () => {
  const moreRecipes = [buildRecipeDetail(), buildRecipeDetail()];
  let stubRecipesGateway: RecipesGateway, recipesService: BaseFetchAllRecipesService;
  let firstObserverSpy: FetchAllRecipesObserverSpy;
  let secondObserverSpy: FetchAllRecipesObserverSpy;

  beforeEach(() => {
    stubRecipesGateway = new StubRecipesGateway(moreRecipes);
    recipesService = new BaseFetchAllRecipesService(stubRecipesGateway);

    firstObserverSpy = new FetchAllRecipesObserverSpy();
    secondObserverSpy = new FetchAllRecipesObserverSpy();
    recipesService.registerObserver(firstObserverSpy);
    recipesService.registerObserver(secondObserverSpy);

    firstObserverSpy.resetSpy();
    secondObserverSpy.resetSpy();
    recipesService.unregisterObserver(secondObserverSpy);

    recipesService.dispatch();
  });

  it("should notify registered observers", () => {
    expect(firstObserverSpy.receivedRecipesWasCalled).toBeTruthy();
    expect(firstObserverSpy.recipesReceived).toEqual(moreRecipes);
  });

  it("should not notify detached observers", () => {
    expect(secondObserverSpy.receivedRecipesWasCalled).toBeFalsy();
  });
});
