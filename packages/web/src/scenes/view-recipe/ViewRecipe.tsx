import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import React, {useEffect, useState} from "react";
import {RecipeDetail} from "@ddubson/feast-domain";
import IngredientPresenter from "../../presenters/IngredientPresenter";
import RecipeDetailPresenter from "../../presenters/RecipeDetailPresenter";
import StepPresenter from "../../presenters/StepPresenter";
import {BackToRecipesLink} from "./components/BackToRecipesLink";
import shortid from "shortid";
import {RecipesGateway} from "../../application/gateways/RecipesGateway";
import {Panel} from "primereact/panel";

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

const ViewRecipe = (props: RecipeOverviewSceneProps) => {
  const {recipesGateway, recipeId} = props;
  const [recipePresenter, setRecipePresenter] = useState<Maybe<RecipeDetailPresenter>>(() => Nothing);

  useEffect(() => {
    recipesGateway.findById(recipeId)
      .then((recipe: RecipeDetail) => setRecipePresenter(Just(new RecipeDetailPresenter(recipe))))
      .catch(() => setRecipePresenter(Nothing));
  }, [recipesGateway, recipeId]);

  const recipes = (r: RecipeDetailPresenter) => (
    <section className="p-mt-2">
      <h3>{r.name}</h3>

      <Panel header="Ingredients" className="p-mt-2">
        {r.ingredients.mapOrDefault(
          (ingredients) => (<div>{ingredients.map(renderIngredient)}</div>),
          (<div>No ingredients!</div>))
        }
      </Panel>
      <Panel header="Instructions" className="p-mt-2">
        {r.steps.mapOrDefault(
          (steps: StepPresenter[]) =>
            <div>{steps.map(renderStep)}</div>,
          (<div>No instructions yet.</div>),
        )
        }
      </Panel>
    </section>
  )

  const recipesOrNothing = recipePresenter.mapOrDefault(recipes, <NoRecipe />);

  return <div>
    <BackToRecipesLink />

    {recipesOrNothing}
  </div>
};

export default ViewRecipe;
