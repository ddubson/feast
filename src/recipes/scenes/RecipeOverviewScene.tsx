import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import * as shortid from "shortid";
import {Ingredient, Recipe, Step} from "../../application/types";
import {BackToRecipesLink} from "../components/BackToRecipesLink";
import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import {FetchByIdRecipesObserver, FetchByIdRecipesService} from "../../application/services/Services";

interface RecipeOverviewSceneProps extends RouteComponentProps {
  fetchByIdRecipesService: FetchByIdRecipesService;
}

const eitherQuantityOrWeight = (ingredient: Ingredient) => {
  const quantityDisplay = ingredient.quantity.mapOrDefault((q) => `${q.value}x`, ``);
  const weightDisplay = ingredient.weight.mapOrDefault((q) => `${q.value} ${q.type}`, ``);

  return (!!quantityDisplay) ? quantityDisplay : weightDisplay;
};

const renderIngredient = (ingredient: Ingredient) => (
  <div key={shortid.generate()}>{eitherQuantityOrWeight(ingredient)} {ingredient.name} - {ingredient.form}</div>
);

const renderStep = (step: Step) => (
  <div key={shortid.generate()} data-testid="instruction-step">{step.value}</div>
);

const RecipeOverviewScene = (props: RecipeOverviewSceneProps) => {
  const {fetchByIdRecipesService} = props;
  const [recipe, setRecipe] = useState<Maybe<Recipe>>(() => Nothing);
  const [observer] = useState<FetchByIdRecipesObserver>({
    receivedRecipe(resolvedRecipe: Recipe): void {
      setRecipe(Just(resolvedRecipe));
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

      {recipe.mapOrDefault(
        (r: Recipe) => (
          <React.Fragment>
            <h3>Recipe</h3>
            <h1>{r.name}</h1>

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
                (steps: Step[]) =>
                  <div>{steps.map(renderStep)}</div>,
                (<div>No instructions yet.</div>),
              )
              }
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
