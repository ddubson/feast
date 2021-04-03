import IngredientPresenter from "../../../presenters/IngredientPresenter";
import React from "react";
import {Maybe} from "purify-ts";

type CurrentIngredientsListProps = { ingredientPresenters: IngredientPresenter[] };

const CurrentIngredientsList: React.FC<CurrentIngredientsListProps> =
  ({ingredientPresenters}: CurrentIngredientsListProps = {ingredientPresenters: []}) => {
    const ingredientsList = <ul>{ingredientPresenters.map((presenter, i) => (
      <li aria-label="ingredient" key={i}>{presenter.renderIngredientText}, {presenter.displayForm}</li>
    ))}</ul>

    return <>
      {Maybe.fromPredicate(() => ingredientPresenters.length > 0, ingredientsList)
        .orDefault(<p>No ingredients yet.</p>)}
    </>
  }
;

export default CurrentIngredientsList;
