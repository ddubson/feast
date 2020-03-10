import React from "react";
import {Link} from "react-router-dom";

export const BackToRecipesLink = () => (
  <Link to={"/"}>
    <button>Back to Recipes</button>
  </Link>
);
