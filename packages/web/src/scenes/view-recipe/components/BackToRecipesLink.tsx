import React from "react";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";

export const BackToRecipesLink = () => (
  <Link to={"/"}>
    <Button className="p-primary-button p-button-sm">Back to Recipes</Button>
  </Link>
);
