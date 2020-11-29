import * as React from "react";
import {Route, Router, Switch} from "react-router-dom";
import {DIContainerContext} from "./AppConfig";
import FixedHeader from "./FixedHeader";
import CreateRecipeScene from "./scenes/add-recipe/CreateRecipeScene";
import RecipeOverviewScene from "./scenes/view-recipe/RecipeOverviewScene";
import RecipesDashboardScene from "./scenes/view-all-recipes/RecipesDashboardScene";
import "./styles/stylesheet.scss";
import {LoggedoutScene, LoginScene} from "./scenes/login/LoginScene";
import browserHistory from "./browser/History";

const AppContainer: React.FC = ({children}) => {
  return (
    <React.Fragment>
      <FixedHeader />
      <div className="app-body">
        {children}
      </div>
    </React.Fragment>
  );
};

export const AppRoot = () => {
  return (
    <React.Fragment>
      <DIContainerContext.Consumer>
        {({fetchAllRecipesService, fetchByIdRecipesService}) => (
          <Router history={browserHistory}>
            <Switch>
              <Route path={"/login"} exact={true} render={() => (<LoginScene />)} />
              <Route path={"/logout"} render={() => (<LoggedoutScene />)} />

              <Route path={"/"} exact={true} render={() =>
                <AppContainer>
                  <RecipesDashboardScene recipesService={fetchAllRecipesService} />
                </AppContainer>
              } />
              <Route path={"/create-recipe"} exact={true} render={({history}) =>
                <AppContainer>
                  <CreateRecipeScene goToScene={history.push} />
                </AppContainer>
              } />
              <Route path={"/recipe/:id"} render={({match}) =>
                <AppContainer>
                  <RecipeOverviewScene fetchByIdRecipesService={fetchByIdRecipesService} recipeId={match.params.id} />
                </AppContainer>
              } />
            </Switch>
          </Router>
        )}
      </DIContainerContext.Consumer>
    </React.Fragment>
  );
};
