import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {HttpRecipesGateway} from "../../../src/application/gateways/HttpRecipesGateway";
import {buildRecipe} from "../../helpers/Builders";
import {RecipeDto} from "../../../src/application/gateways/dtos/RecipeDto";
import {Recipe} from "../../../src/application/types";

describe("HttpRecipesGateway", () => {
  const mockAxios = new MockAdapter(axios);
  const recipeGateway = new HttpRecipesGateway(axios);

  describe("findById", () => {
    describe("given a valid recipe id", () => {
      const recipeId = "123";

      describe("when all fields are populated", () => {
        it("then returns a recipe successfully", async () => {
          const expectedRecipe: Recipe = buildRecipe();
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
            steps: {
              1: "Do this",
              2: "Do that",
            },
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
