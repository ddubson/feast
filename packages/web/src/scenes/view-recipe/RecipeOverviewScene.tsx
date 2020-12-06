import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import React, {useEffect, useState} from "react";
import {RecipeDetail} from "@feast/domain";
import IngredientPresenter from "../../presenters/IngredientPresenter";
import RecipeDetailPresenter from "../../presenters/RecipeDetailPresenter";
import StepPresenter from "../../presenters/StepPresenter";
import {BackToRecipesLink} from "./components/BackToRecipesLink";
import shortid from "shortid";
import {RecipesGateway} from "../../application/gateways/RecipesGateway";

interface RecipeOverviewSceneProps {
  recipesGateway: RecipesGateway
  recipeId: string;
}

const renderIngredient = ({form, displayCulinaryMeasure, name}: IngredientPresenter) => {
  const resolvedForm = form.mapOrDefault((f) => `- ${f}`, ``);
  return (
    <div key={shortid.generate()} aria-label="Recipe ingredient">{displayCulinaryMeasure} {name} {resolvedForm}</div>
  );
};

const renderStep = (step: StepPresenter) => (
  <div key={shortid.generate()} data-testid="instruction-step">{step.stepNumber}: {step.stepValue}</div>
);

const NoRecipe = () => <div>No recipe!</div>;

const RecipeOverviewScene = (props: RecipeOverviewSceneProps) => {
  const {recipesGateway, recipeId} = props;
  const [recipePresenter, setRecipePresenter] = useState<Maybe<RecipeDetailPresenter>>(() => Nothing);

  useEffect(() => {
    recipesGateway.findById(recipeId)
      .then((recipe: RecipeDetail) => setRecipePresenter(Just(new RecipeDetailPresenter(recipe))))
      .catch(() => setRecipePresenter(Nothing));
  }, [recipesGateway, recipeId]);

  return (
    <div>
      <BackToRecipesLink />

      {recipePresenter.mapOrDefault(
        (r: RecipeDetailPresenter) => (
          <>
            <div className="ui header">Recipe
              <div className="ui large header" aria-label="Recipe name">{r.name}</div>
            </div>
            <div className="ui raised horizontal segments">
              <div className="ui segment">
                <h3 className="ui dividing header">Ingredients</h3>
                {r.ingredients.mapOrDefault(
                  (ingredients) => (<div>{ingredients.map(renderIngredient)}</div>),
                  (<div>No ingredients!</div>))
                }
              </div>
              <div className="ui segment">
                <h3 className="ui dividing header">Instructions</h3>
                {r.steps.mapOrDefault(
                  (steps: StepPresenter[]) =>
                    <div>{steps.map(renderStep)}</div>,
                  (<div>No instructions yet.</div>),
                )
                }
              </div>
            </div>
          </>
        ),
        <NoRecipe />,
      )}
    </div>
  );
};

export default RecipeOverviewScene;
