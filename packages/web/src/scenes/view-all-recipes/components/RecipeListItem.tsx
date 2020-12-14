import * as React from "react";
import {Link} from "react-router-dom";
import {Recipe} from "@ddubson/feast-domain";
import {Card} from "primereact/card";
import {Button} from "primereact/button";

const RecipeListItem = ({recipe}: { recipe: Recipe }) => {
  const header = <div>{recipe.name}</div>;
  const footer = <span>
    <Link to={`/recipe/${recipe.id}`}>
      <Button label="Open" className={"open-recipe-button p-button-sm"} />
    </Link>
  </span>;

  return (
    <Card className="p-mt-2 p-mr-3 p-p-2" header={header} footer={footer} />
  );
};

export default RecipeListItem;
