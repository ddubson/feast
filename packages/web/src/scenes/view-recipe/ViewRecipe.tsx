import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import React, {FormEvent, useEffect, useState} from "react";
import {RecipeDetail} from "@ddubson/feast-domain";
import IngredientPresenter from "../../presenters/IngredientPresenter";
import RecipeDetailPresenter from "../../presenters/RecipeDetailPresenter";
import StepPresenter from "../../presenters/StepPresenter";
import {BackToRecipesLink} from "./components/BackToRecipesLink";
import shortid from "shortid";
import {Panel} from "primereact/panel";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";

interface RecipeOverviewSceneProps {
  findRecipeById: (recipeId: string) => Promise<RecipeDetail>;
  deleteRecipe: (recipeId: string) => Promise<boolean>;
  recipeId: string;
  goToScene: (location: string) => void;
}

const renderIngredient = ({form, displayCulinaryMeasure, name}: IngredientPresenter) => {
  const resolvedForm = form.mapOrDefault((f) => `- ${f}`, ``);
  return (
    <div key={shortid.generate()}
         aria-label="Recipe ingredient">{displayCulinaryMeasure} {name} {resolvedForm}</div>
  );
};

const renderStep = (step: StepPresenter) => (
  <div key={shortid.generate()}
       data-testid="instruction-step">{step.stepNumber}: {step.stepValue}</div>
);

const NoRecipe = () => <div>No recipe!</div>;

const ViewRecipe = (props: RecipeOverviewSceneProps) => {
  const {findRecipeById, recipeId, deleteRecipe, goToScene} = props;
  const [recipePresenter, setRecipePresenter] = useState<Maybe<RecipeDetailPresenter>>(() => Nothing);

  useEffect(() => {
    findRecipeById(recipeId)
      .then((recipe: RecipeDetail) => setRecipePresenter(Just(new RecipeDetailPresenter(recipe))))
      .catch(() => setRecipePresenter(Nothing));
  }, [findRecipeById, deleteRecipe, recipeId]);

  const onDeleteClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteRecipe(recipeId).then(() => {
      goToScene("/");
    }).catch((error) => {
      console.error(error);
    });
  };

  const recipe = (r: RecipeDetailPresenter) => (
    <section className="p-mt-2">
      <h3 aria-label="Recipe name">{r.name}</h3>
      <section className="p-grid">
        <Panel header="Ingredients" className="p-col-12 p-md-6 p-lg-3 p-mt-2">
          {Maybe.fromPredicate(() => r.ingredients.length > 0,
            (<div>{r.ingredients.map(renderIngredient)}</div>))
            .orDefault((<div>No ingredients!</div>))
          }
        </Panel>
        <Panel header="Instructions" className="p-col-12 p-md-6 p-lg-9 p-mt-2">
          {Maybe.fromPredicate(() => r.steps.length > 0,
          (<div>{r.steps.map(renderStep)}</div>))
            .orDefault((<div>No instructions yet.</div>))
        }
      </Panel></section>
    </section>
  )

  const recipeOrNothing = recipePresenter.mapOrDefault(recipe, <NoRecipe />);
  const toolbar = () => (<>
    <Button icon="pi pi-times" className="p-button-sm p-button-danger"
            onClick={onDeleteClick}
            aria-label={"Delete forever"} label={"Delete forever"} />
  </>);

  return <div>
    <BackToRecipesLink />

    {recipeOrNothing}

    <Toolbar className={"p-mt-3"} left={toolbar} />
  </div>
};

export default ViewRecipe;
