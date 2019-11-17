import React, {PureComponent} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import CreateRecipeScene from "./recipes/scenes/CreateRecipeScene";
import RecipeOverviewScene from "./recipes/scenes/RecipeOverviewScene";
import RecipesDashboardScene from "./recipes/scenes/RecipesDashboardScene";
import {Container, Menu} from "semantic-ui-react";

const FixedHeader = () => (
  <Menu fixed="top">
    <Container className={"app-title"}>
      <Menu.Item data-test="app-title" as="a" header>
        Feast
      </Menu.Item>
    </Container>
  </Menu>
);

export default class AppRoot extends PureComponent {
  public render() {
    return (
      <React.Fragment>
        <Router>
          <FixedHeader/>
          <Container className={"app-body"}>
            <Route path={"/"} exact={true} render={() => <RecipesDashboardScene/>}/>
            <Route path={"/create-recipe"} exact={true}
                   render={({history}) => <CreateRecipeScene history={history}/>}/>
            <Route path={"/recipe/:id"} render={(props) =>
              <RecipeOverviewScene {...props} />
            }/>
          </Container>
        </Router>
      </React.Fragment>
    );
  }
}
