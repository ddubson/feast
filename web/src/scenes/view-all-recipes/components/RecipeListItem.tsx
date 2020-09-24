import * as React from "react";
import {Link} from "react-router-dom";
import {Recipe} from "../../../../../domain/src/types";

const RecipeListItem = ({recipe}: { recipe: Recipe }) => (
  <div className="ui card" aria-label="Recipe card">
    <div className="content">
      <Link to={`/recipe/${recipe.id}`}>
        <h6>
          {recipe.name}
        </h6>
      </Link>
    </div>
  </div>
);

export default RecipeListItem;
