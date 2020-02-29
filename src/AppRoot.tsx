import React, {PureComponent} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container} from "semantic-ui-react";
import {DIContainerContext} from "./AppConfig";
import FixedHeader from "./FixedHeader";
import CreateRecipeScene from "./recipes/scenes/CreateRecipeScene";
import RecipeOverviewScene from "./recipes/scenes/RecipeOverviewScene";
import RecipesDashboardScene from "./recipes/scenes/RecipesDashboardScene";
import * as ReactDOM from "react-dom";
import "./styles/stylesheet";

class AppRoot extends PureComponent {
  public render() {
    return (
      <React.Fragment>
        <DIContainerContext.Consumer>
          {({fetchAllRecipesService, fetchByIdRecipesService}) => (
            <Router>
              <FixedHeader />
              <Container className={"app-body"}>
                <Switch>
                  <Route path={"/"} exact={true} render={() =>
                    <RecipesDashboardScene recipesService={fetchAllRecipesService} />} />
                  <Route path={"/create-recipe"} exact={true}
                         render={({history}) => <CreateRecipeScene history={history} />} />
                  <Route path={"/recipe/:id"} render={(props) => <RecipeOverviewScene
                    fetchByIdRecipesService={fetchByIdRecipesService} {...props} />} />
                </Switch>
              </Container>
            </Router>
          )}
        </DIContainerContext.Consumer>
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <AppRoot />,
  document.getElementById("root"),
);
