import {Button} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";

export const BackToRecipesLink = () => (
  <Link to={"/"}>
    <Button>Back to Recipes</Button>
  </Link>
);
