import React, {Fragment} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps} from "react-router-dom";
import {Container} from "semantic-ui-react";
import {DIContainerContext} from "./AppConfig";
import FixedHeader from "./FixedHeader";
import CreateRecipeScene from "./scenes/add-recipe/CreateRecipeScene";
import RecipeOverviewScene from "./scenes/view-recipe/RecipeOverviewScene";
import RecipesDashboardScene from "./scenes/view-all-recipes/RecipesDashboardScene";
import * as ReactDOM from "react-dom";
import "./styles/stylesheet";
import {Auth0Provider, useAuth0} from "./browser/AuthFacade";
import browserHistory from "./browser/History";
import {LoginScene, LoggedoutScene} from "./scenes/login/LoginScene";

const AppContainer: React.FC = ({children}) => {
  const {isAuthenticated} = useAuth0();

  if (!isAuthenticated) {
    return <Redirect to={"/login"} />;
  }

  return (
    <Fragment>
      <FixedHeader />
      <Container className="app-body">
        {children}
      </Container>
    </Fragment>
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
          <Router>
            <Switch>
              <Route path={"/login"} exact={true} render={() => (<LoginScene />)} />
              <Route path={"/logout"} render={() => (<LoggedoutScene />)} />

              <Route path={"/"} exact={true} render={() =>
                <AppContainer><RecipesDashboardScene recipesService={fetchAllRecipesService} /></AppContainer>} />
              <Route path={"/create-recipe"} exact={true} render={({history}) =>
                <AppContainer><CreateRecipeScene history={history} /></AppContainer>} />
              <Route path={"/recipe/:id"} render={(props) =>
                <AppContainer>
                  <RecipeOverviewScene fetchByIdRecipesService={fetchByIdRecipesService} {...props} />
                </AppContainer>
              } />
            </Switch>
          </Router>
        )}
      </DIContainerContext.Consumer>
    </React.Fragment>
  );
};

const onRedirectCallback = (appState: any) => {
  browserHistory.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const config = {
  "domain": "ddubson1.auth0.com",
  "clientId": "qnwkoVRchNoKi7dCq0XHIfz1GA1xYgZf"
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <AppRoot />
  </Auth0Provider>,
  document.getElementById("root"),
);
