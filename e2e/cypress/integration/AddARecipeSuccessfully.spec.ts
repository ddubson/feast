context("Add a recipe successfully", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("when I click on Add Recipes", () => {
    beforeEach(() => {
      cy.get("[data-create-recipe-link]").click();
    });

    describe("when I fill out the recipe form", () => {
      beforeEach(() => {
          cy.get("[data-recipe-name-input]").type("Delicious Recipe for Something");
          cy.get("[data-ingredient-quantity]").type("2");
          cy.get("[data-ingredient-form]").type("Chopped");
          cy.get("[data-ingredient-name]").type("Something");
          cy.get("[data-add-ingredient]").click();
      });

      describe("when I click Add Recipe", () => {
        beforeEach(() => {
          cy.get("[data-add-recipe]").click();
        });

        it("should display the recipe in recipes list", () => {
          cy.get("[data-recipe-list-item]").should("contain", "Delicious Recipe for Something");
        });
      });
    });
  });
});
