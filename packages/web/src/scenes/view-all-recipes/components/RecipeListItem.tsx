import * as React from "react";
import {Link} from "react-router-dom";
import {Recipe} from "@feast/domain";
import {Card} from "primereact/card";

const RecipeListItem = ({recipe}: { recipe: Recipe }) => (
  <Card>
    <Link to={`/recipe/${recipe.id}`}>
      <h6>
        {recipe.name}
      </h6>
    </Link>
  </Card>
);

export default RecipeListItem;
