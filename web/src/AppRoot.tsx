import React, {PureComponent} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import CreateRecipeScene from "./recipes/scenes/CreateRecipeScene";
import RecipeOverviewScene from "./recipes/scenes/RecipeOverviewScene";
import RecipesDashboardScene from "./recipes/scenes/RecipesDashboardScene";

export default class AppRoot extends PureComponent {
  public render() {
    return (
      <React.Fragment>
        <Router>
          <section className={"app-title"}>
            <h1 data-test="app-title" color="inherit">
              Feast
            </h1>
          </section>
          <div className={"app-body"}>
            <Route path={"/"} exact={true} render={() => <RecipesDashboardScene />} />
            <Route path={"/create-recipe"} exact={true}
                   render={({history}) => <CreateRecipeScene history={history} />} />
            <Route path={"/recipe/:id"} render={(props) =>
              <RecipeOverviewScene {...props} />
            } />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
