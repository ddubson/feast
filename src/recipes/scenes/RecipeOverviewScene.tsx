import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import * as shortid from "shortid";
import {Ingredient, Recipe, Step} from "../../application/types";
import {BackToRecipesLink} from "../components/BackToRecipesLink";
import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import {FetchByIdRecipesObserver, FetchByIdRecipesService} from "../../application/services/Services";
import IngredientPresenter from "../presenters/IngredientPresenter";
import RecipePresenter from "../presenters/RecipePresenter";
import StepPresenter from "../presenters/StepPresenter";

interface RecipeOverviewSceneProps extends RouteComponentProps {
  fetchByIdRecipesService: FetchByIdRecipesService;
}

const renderIngredient = ({form, displayCulinaryMeasure, name}: IngredientPresenter) => {
  const resolvedForm = form.mapOrDefault((f) => `- ${f}`, ``);
  return (
    <div key={shortid.generate()}>{displayCulinaryMeasure} {name} {resolvedForm}</div>
  );
};

const renderStep = (step: StepPresenter) => (
  <div key={shortid.generate()} data-testid="instruction-step">{step.stepNumber}: {step.stepValue}</div>
);

const RecipeOverviewScene = (props: RecipeOverviewSceneProps) => {
  const {fetchByIdRecipesService} = props;
  const [recipePresenter, setRecipePresenter] = useState<Maybe<RecipePresenter>>(() => Nothing);
  const [observer] = useState<FetchByIdRecipesObserver>({
    receivedRecipe(resolvedRecipe: Recipe): void {
      setRecipePresenter(Just(new RecipePresenter(resolvedRecipe)));
    },
  });

  useEffect(() => {
    fetchByIdRecipesService.registerObserver(observer);
    fetchByIdRecipesService.dispatch((props.match.params as any).id);

    return function cleanup() {
      fetchByIdRecipesService.unregisterObserver(observer);
    };
  }, [observer]);

  return (
    <div>
      <BackToRecipesLink />

      {recipePresenter.mapOrDefault(
        (r: RecipePresenter) => (
          <React.Fragment>
            <h3>Recipe</h3>
            <h1>{r.name}</h1>

            <div className="display-flex justify-space-around wrap">
              <div>
                <h3>Ingredients</h3>
                {r.ingredients.mapOrDefault(
                  (ingredients) => (<div>{ingredients.map(renderIngredient)}</div>),
                  (<div>No ingredients!</div>))
                }
              </div>
              <div>
                <h3>Instructions</h3>
                {r.steps.mapOrDefault(
                  (steps: StepPresenter[]) =>
                    <div>{steps.map(renderStep)}</div>,
                  (<div>No instructions yet.</div>),
                )
                }
              </div>
            </div>
          </React.Fragment>
        ),
        (
          <div>No recipe!</div>
        ),
      )}
    </div>
  );
};

export default RecipeOverviewScene;
