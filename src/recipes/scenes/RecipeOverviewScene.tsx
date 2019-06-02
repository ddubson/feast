import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Recipe} from "../../shared-components/recipe";

export interface RecipeOverviewSceneProps {
  recipe: Recipe;
}

class RecipeOverviewScene extends PureComponent<RecipeOverviewSceneProps> {
  constructor(props: RecipeOverviewSceneProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div>Recipe Overview</div>
        <div>
          <div>{this.props.recipe.name}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  recipe: state.recipeStore.find((recipe: Recipe) => recipe.id === ownProps.match.params.id),
});

export default connect<RecipeOverviewSceneProps>(mapStateToProps)(RecipeOverviewScene);
