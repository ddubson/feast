import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {Just} from "purify-ts/Maybe";
import {HttpRecipesGateway} from "./HttpRecipesGateway";
import {buildRecipe} from "../../__tests__/helpers/Builders";
import {RecipeDto} from "./dtos/RecipeDto";
import {Recipe} from "../types";

describe("HttpRecipesGateway", () => {
  const mockAxios = new MockAdapter(axios);
  const recipeGateway = new HttpRecipesGateway(axios);

  describe("findById", () => {
    describe("given a valid recipe id", () => {
      const recipeId = "123";

      describe("when all fields are populated", () => {
        it("then returns a recipe successfully", async () => {
          const expectedRecipe: Recipe = buildRecipe({
            steps: Just([
              {stepNumber: 1, value: "Do this first"},
              {stepNumber: 2, value: "Do that"},
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
