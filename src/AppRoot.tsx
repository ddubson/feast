import React, {PureComponent} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import CreateRecipeScene from "./recipes/scenes/CreateRecipeScene";
import RecipesDashboardScene from "./recipes/scenes/RecipesDashboardScene";

export class AppRoot extends PureComponent {
  public render() {
    return (
      <React.Fragment>
        <Router>
          <nav>Feast</nav>
          <Route path={"/"} exact={true} component={RecipesDashboardScene} />
          <Route path={"/create-recipe"} exact={true} component={CreateRecipeScene} />
        </Router>
      </React.Fragment>
    );
  }
}
