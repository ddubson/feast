import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as shortid from "shortid";
import {Recipe} from "../../shared-components/recipe";

export interface RecipesDashboardSceneProps {
  recipes: Recipe[];
}

class RecipesDashboardScene extends React.PureComponent<RecipesDashboardSceneProps> {
  public render() {
    return (
      <div>
        <h1>Recipes Dashboard</h1>
        <div>
          <h1>Recipes</h1>
          {this.props.recipes.map((recipe: Recipe) => <div key={shortid.generate()}>{recipe.name}</div>)}
        </div>
        <div>
          <Link to={"/create-recipe"}>Create a Recipe</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  recipes: state.recipeStore,
});

export default connect<RecipesDashboardSceneProps>(mapStateToProps)(RecipesDashboardScene);
