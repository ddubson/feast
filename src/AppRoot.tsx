import React, {PureComponent} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import CreateRecipeScene from "./recipes/scenes/CreateRecipeScene";
import RecipeOverviewScene from "./recipes/scenes/RecipeOverviewScene";
import RecipesDashboardScene from "./recipes/scenes/RecipesDashboardScene";

export class AppRoot extends PureComponent {
  public render() {
    return (
      <React.Fragment>
        <Router>
          <nav className="app-nav"><h1>Feast</h1></nav>
          <div className="app-container container justify-center">
            <Route path={"/"} exact={true} component={RecipesDashboardScene} />
            <Route path={"/create-recipe"} exact={true} component={CreateRecipeScene} />
            <Route path={"/recipe/:id"} component={RecipeOverviewScene} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
