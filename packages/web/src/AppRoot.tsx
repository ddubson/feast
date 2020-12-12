import * as React from "react";
import {Route, Router, Switch} from "react-router-dom";
import {DIContainerContext} from "./AppConfig";
import FixedHeader from "./FixedHeader";
import AddRecipeScene from "./scenes/add-recipe/AddRecipeScene";
import ViewRecipe from "./scenes/view-recipe/ViewRecipe";
import ViewAllRecipes from "./scenes/view-all-recipes/ViewAllRecipes";
import "./styles/main.scss";
import {LoggedoutScene, LoginScene} from "./scenes/login/LoginScene";
import browserHistory from "./browser/History";

const AppContainer: React.FC = ({children}) =>
  (
    <>
      <FixedHeader />
      <section className="p-m-3">
        {children}
      </section>
    </>
  );

export const AppRoot = () => {
  return (
    <>
      <DIContainerContext.Consumer>
        {({recipesGateway}) => (
          <Router history={browserHistory}>
            <Switch>
              <Route path={"/login"} exact={true} render={() => (<LoginScene />)} />
              <Route path={"/logout"} render={() => (<LoggedoutScene />)} />

              <Route path={"/"} exact={true} render={() =>
                <AppContainer>
                  <ViewAllRecipes recipesGateway={recipesGateway} />
                </AppContainer>
              } />
              <Route path={"/recipe/new"} exact={true} render={({history}) =>
                <AppContainer>
                  <AddRecipeScene saveRecipe={recipesGateway.saveRecipe.bind(recipesGateway)} goToScene={history.push} />
                </AppContainer>
              } />
              <Route path={"/recipe/:id"} render={({match}) =>
                <AppContainer>
                  <ViewRecipe recipesGateway={recipesGateway} recipeId={match.params.id} />
                </AppContainer>
              } />
            </Switch>
          </Router>
        )}
      </DIContainerContext.Consumer>
    </>
  );
};
