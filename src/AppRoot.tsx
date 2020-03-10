import React, {PureComponent} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container} from "semantic-ui-react";
import {DIContainerContext} from "./AppConfig";
import FixedHeader from "./FixedHeader";
import CreateRecipeScene from "./scenes/add-recipe/CreateRecipeScene";
import RecipeOverviewScene from "./scenes/view-recipe/RecipeOverviewScene";
import RecipesDashboardScene from "./scenes/view-all-recipes/RecipesDashboardScene";
import * as ReactDOM from "react-dom";
import "./styles/stylesheet";

const AppRoot = () => (
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

ReactDOM.render(
  <AppRoot />,
  document.getElementById("root"),
);
