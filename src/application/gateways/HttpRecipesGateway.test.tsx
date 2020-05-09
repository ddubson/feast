import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {Just, Nothing} from "purify-ts/Maybe";
import {HttpRecipesGateway} from "./HttpRecipesGateway";
import {buildIngredient, buildRecipe, buildRecipeDetail} from "../../__tests__/helpers/Builders";
import {Volumes} from "../Volumes";
import {RecipeDetailDto} from "./RecipeDtoTypes";
import {Recipe} from "../types";

describe("findAll", () => {
  test("resolves recipes response", async () => {
    const mockAxios = new MockAdapter(axios);
    const recipesGateway = new HttpRecipesGateway(axios);

    mockAxios
      .onGet(`/api/recipes`)
      .reply(200, [expectedRecipe]);

    const foundRecipes: Recipe[] = await recipesGateway.findAll();
    expect(foundRecipes).toEqual([expectedRecipe]);
  });
});

describe("findById", () => {
  test("provided a valid recipe id, resolves a recipe", async () => {
    const mockAxios = new MockAdapter(axios);
    const recipesGateway = new HttpRecipesGateway(axios);
    const recipeId = "123";

    mockAxios
      .onGet(`/api/recipes/${recipeId}`)
      .reply(200, response);

    const foundRecipe = await recipesGateway.findById(recipeId);
    expect(foundRecipe).toEqual(expectedRecipeDetail);
  });

});

const expectedRecipe = buildRecipe();

const expectedRecipeDetail = buildRecipeDetail({
  steps: Just([
    {stepNumber: 1, value: "Do this first"},
    {stepNumber: 2, value: "Do that"},
  ]),
  ingredients: Just([
    buildIngredient(),
    buildIngredient({
      weight: Nothing,
      quantity: Nothing,
      volume: Just({
        value: 2,
        volumeType: Volumes.tablespoon,
      }),
    }),
  ]),
});

const response: RecipeDetailDto = {
  id: expectedRecipeDetail.id,
  name: "Great Recipe",
  ingredients: [
    {
      id: expectedRecipeDetail.ingredients.orDefault([])[0].id,
      name: "Great Ingredient",
      form: "Chopped",
      quantity: {value: 2},
      weight: {value: 0, type: "NONE"},
      volume: null,
    },
    {
      id: expectedRecipeDetail.ingredients.orDefault([])[1].id,
      name: "Great Ingredient",
      form: "Chopped",
      quantity: {value: 0},
      weight: {value: 0, type: "NONE"},
      volume: {value: 2, type: "TABLESPOON"},
    },
  ],
  steps: [
    {stepNumber: 1, stepText: "Do this first"},
    {stepNumber: 2, stepText: "Do that"},
  ],
};
