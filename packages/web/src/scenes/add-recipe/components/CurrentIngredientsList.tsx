import IngredientPresenter from "../../../presenters/IngredientPresenter";
import React from "react";
import {Maybe} from "purify-ts";

type CurrentIngredientsListProp = { ingredientPresenters: IngredientPresenter[] };

const CurrentIngredientsList: React.FC<CurrentIngredientsListProp> =
  ({ingredientPresenters}: CurrentIngredientsListProp = {ingredientPresenters: []}) => {
    const ingredientsList = <ul>{ingredientPresenters.map((presenter, i) => (
      <li aria-label="ingredient" key={i}>{presenter.renderIngredientText}</li>
    ))}</ul>

    return <>
      {Maybe.fromPredicate(() => ingredientPresenters.length > 0, ingredientsList)
        .orDefault(<p>No ingredients yet.</p>)}
    </>
  }
;

export default CurrentIngredientsList;
