import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as shortid from "shortid";
import {Recipe} from "../../shared-components/recipe";

export interface RecipesDashboardSceneProps {
  recipes: Recipe[];
}

const renderRecipes = (recipes: Recipe[]) => {
  return recipes.map((recipe: Recipe) => <div key={shortid.generate()}>{recipe.name}</div>);
};

class RecipesDashboardScene extends React.PureComponent<RecipesDashboardSceneProps> {
  public render() {
    return (
      <div className="recipe-dashboard">
        <h1>Recipes Dashboard</h1>
        <div className="recipe-list">
          <div className="recipe-list-header"><h2>Recipes</h2></div>
          {renderRecipes(this.props.recipes)}
        </div>
        <div>
          <Link to={"/create-recipe"}><button className="primary-button">+ Create a Recipe</button></Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  recipes: state.recipeStore,
});

export default connect<RecipesDashboardSceneProps>(mapStateToProps)(RecipesDashboardScene);
