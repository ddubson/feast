import * as React from "react";
import {Link} from "react-router-dom";
import {Recipe} from "../../application/types";

const RecipeListItem = ({recipe}: { recipe: Recipe }) => (
  <ul data-testid="recipe">
    <li>
      <Link to={`/recipe/${recipe.id}`}>
        <h6>
          {recipe.name}
        </h6>
      </Link>
    </li>
  </ul>
);

export default RecipeListItem;
