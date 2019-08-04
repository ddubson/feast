import React from "react";
import {Link} from "react-router-dom";

export const BackToRecipesLink = () => (<Link to={"/"}>
  <button className="mdc-button"><span className="mdc-button__label">Back to Recipes</span></button></Link>);
