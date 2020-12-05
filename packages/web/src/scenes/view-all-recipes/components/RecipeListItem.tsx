import * as React from "react";
import {Link} from "react-router-dom";
import {Recipe} from "@feast/domain";
import {Card} from "primereact/card";
import {Button} from "primereact/button";

const RecipeListItem = ({recipe}: { recipe: Recipe }) => {
  const header = <>{recipe.name}</>;
  const footer = <span>
    <Link to={`/recipe/${recipe.id}`}>
      <Button label="Open" style={{marginRight: '0.25em'}} />
    </Link>
  </span>;

  return (
    <Card className={"recipe-card p-m-5 p-p-2"} header={header} footer={footer} />
  );
};

export default RecipeListItem;
