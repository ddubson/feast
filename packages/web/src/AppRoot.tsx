import * as React from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {DIContainerContext} from "./AppConfig";
import FixedHeader from "./FixedHeader";
import AddRecipeScene from "./scenes/add-recipe/AddRecipeScene";
import ViewRecipe from "./scenes/view-recipe/ViewRecipe";
import ViewAllRecipes from "./scenes/view-all-recipes/ViewAllRecipes";
import "./styles/main.scss";
import {LoggedoutScene, LoginScene} from "./scenes/login/LoginScene";
import browserHistory from "./browser/History";
import {AuthTokenHandler} from "./browser/Auth";

type AppContainerProps = {
  authTokenHandler: AuthTokenHandler,
  children: any
}
const AppContainer: React.FC<AppContainerProps> = ({children, authTokenHandler}: AppContainerProps) => {
  return (
    <>
      <FixedHeader isUserSignedIn={authTokenHandler.isUserTokenPresent} />
      <section className="p-m-3">
        {children}
      </section>
    </>
  );
};

export const AppRoot = () => {
  return (
    <>
      <DIContainerContext.Consumer>
        {({recipesGateway, authTokenHandler}) => (
          <Router history={browserHistory}>
            <Switch>
              <Route path={"/login"} exact={true} render={() => (<LoginScene />)} />
              <Route path={"/logout"} render={() => (<LoggedoutScene />)} />

              <Route path={"/"} exact={true} render={() =>
                <AppContainer authTokenHandler={authTokenHandler}>
                  <ViewAllRecipes recipesGateway={recipesGateway} />
                </AppContainer>
              } />
              <Route path={"/recipe/new"} exact={true} render={({history}) =>
                <AppContainer authTokenHandler={authTokenHandler}>
                  <AddRecipeScene saveRecipe={recipesGateway.saveRecipe.bind(recipesGateway)}
                                  goToScene={history.push} />
                </AppContainer>
              } />
              <Route path={"/recipe/:id"} render={({match, history}) =>
                <AppContainer authTokenHandler={authTokenHandler}>
                  <ViewRecipe findRecipeById={recipesGateway.findById.bind(recipesGateway)}
                              deleteRecipe={recipesGateway.deleteRecipe.bind(recipesGateway)}
                              goToScene={history.push}
                              recipeId={match.params.id} />
                </AppContainer>
              } />
            </Switch>
          </Router>
        )}
      </DIContainerContext.Consumer>
    </>
  );
};
