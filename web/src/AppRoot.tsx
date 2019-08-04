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
          <header className="mdc-top-app-bar">
            <div className="mdc-top-app-bar__row">
              <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                <span className="mdc-top-app-bar__title" data-test="app-title">Feast</span>
              </section>
            </div>
          </header>
          <div className="mdc-top-app-bar--fixed-adjust app-container container justify-center">
            <Route path={"/"} exact={true} component={RecipesDashboardScene} />
            <Route path={"/create-recipe"} exact={true} component={CreateRecipeScene} />
            <Route path={"/recipe/:id"} component={RecipeOverviewScene} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
