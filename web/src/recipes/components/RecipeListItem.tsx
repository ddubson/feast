import {ListItem, ListItemText, Typography} from "@material-ui/core";
import * as React from "react";
import {Link} from "react-router-dom";
import {Recipe} from "../../shared-components/recipe";

const RecipeListItem = ({ recipe }: { recipe: Recipe }) => (
  <ListItem data-recipe-list-item>
    <ListItemText>
      <Link to={`/recipe/${recipe.id}`}>
        <Typography variant={"h6"}>
          {recipe.name}
        </Typography>
      </Link>
    </ListItemText>
  </ListItem>);

export default RecipeListItem;
