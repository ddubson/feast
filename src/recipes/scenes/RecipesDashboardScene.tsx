import * as React from "react";
import {Link} from "react-router-dom";

export class RecipesDashboardScene extends React.PureComponent {
  public render() {
    return (
      <div>
        <h1>Recipes Dashboard</h1>
        <div>
          <Link to={"/create-recipe"}>Create a Recipe</Link>
        </div>
      </div>
    );
  }
}
