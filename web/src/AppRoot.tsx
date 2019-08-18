import {AppBar, createStyles, Theme, Typography, withStyles, WithStyles} from "@material-ui/core";
import React, {PureComponent} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {recipeStore} from "./AppConfig";
import CreateRecipeScene from "./recipes/scenes/CreateRecipeScene";
import RecipeOverviewScene from "./recipes/scenes/RecipeOverviewScene";
import RecipesDashboardScene from "./recipes/scenes/RecipesDashboardScene";

export default class AppRoot extends PureComponent {
  public render() {
    return (
      <React.Fragment>
        <Router>
          <AppBar position="static" className={"app-title"}>
            <Typography data-test="app-title" color="inherit" noWrap>
              Feast
            </Typography>
          </AppBar>
          <div className={"app-body"}>
            <Route path={"/"} exact={true} render={() => <RecipesDashboardScene recipeStore={recipeStore} />} />
            <Route path={"/create-recipe"} exact={true}
                   render={({history}) => <CreateRecipeScene recipeStore={recipeStore} history={history} />} />
            <Route path={"/recipe/:id"} render={(props) =>
              <RecipeOverviewScene recipeStore={recipeStore} {...props} />
            } />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
