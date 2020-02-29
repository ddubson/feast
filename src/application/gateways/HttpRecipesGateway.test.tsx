import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {Just, Nothing} from "purify-ts/Maybe";
import {HttpRecipesGateway} from "./HttpRecipesGateway";
import {buildIngredient, buildRecipe} from "../../__tests__/helpers/Builders";
import {Volumes} from "../Volumes";
import {RecipeDto} from "./RecipeDtoTypes";

describe("HttpRecipesGateway", () => {
  const mockAxios = new MockAdapter(axios);
  const recipeGateway = new HttpRecipesGateway(axios);

  describe("findById", () => {
    describe("given a valid recipe id", () => {
      const recipeId = "123";

      describe("when all fields are populated", () => {
        it("then returns a recipe successfully", async () => {
          const expectedRecipe = buildRecipe({
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

          const response: RecipeDto = {
            id: expectedRecipe.id,
            name: "Great Recipe",
            ingredients: [
              {
                id: expectedRecipe.ingredients.orDefault([])[0].id,
                name: "Great Ingredient",
                form: "Chopped",
                quantity: {value: 2},
                weight: {value: 0, type: "NONE"},
                volume: null,
              },
              {
                id: expectedRecipe.ingredients.orDefault([])[1].id,
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

          mockAxios
            .onGet(`/api/recipes/${recipeId}`)
            .reply(200, response);

          const foundRecipe = await recipeGateway.findById(recipeId);
          expect(foundRecipe).toEqual(expectedRecipe);
        });
      });
    });
  });
});
