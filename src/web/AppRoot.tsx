import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Redirect, Route, Switch} from "react-router-dom";
import {Container} from "semantic-ui-react";
import {DIContainerContext} from "./AppConfig";
import FixedHeader from "./FixedHeader";
import CreateRecipeScene from "./scenes/add-recipe/CreateRecipeScene";
import RecipeOverviewScene from "./scenes/view-recipe/RecipeOverviewScene";
import RecipesDashboardScene from "./scenes/view-all-recipes/RecipesDashboardScene";
import "./styles/stylesheet.scss";
import {Auth0Provider, onRedirectFn, useAuth0} from "./browser/auth/AuthFacade";
import {LoggedoutScene, LoginScene} from "./scenes/login/LoginScene";
import {authConfig} from "./browser/auth/AuthConfig";
import browserHistory from "./browser/History";

const AppContainer: React.FC = ({children}) => {
  const {isAuthenticated} = useAuth0();

  if (!isAuthenticated) {
    return <Redirect to={"/login"} />;
  }

  return (
    <React.Fragment>
      <FixedHeader />
      <Container className="app-body">
        {children}
      </Container>
    </React.Fragment>
  );
};

const AppRoot = () => {
  const {loading} = useAuth0();

  if (loading) {
    return <>Loading</>;
  }

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

ReactDOM.render(
  <Auth0Provider
    domain={authConfig.domain}
    client_id={authConfig.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectFn}
  >
    <AppRoot />
  </Auth0Provider>,
  document.getElementById("root"),
);
