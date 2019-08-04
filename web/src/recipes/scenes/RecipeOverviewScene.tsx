import React, {PureComponent} from "react";
import {connect} from "react-redux";
import * as shortid from "shortid";
import {emptyRecipe} from "../../core/recipe-store";
import {Ingredient} from "../../shared-components/ingredient";
import {Recipe} from "../../shared-components/recipe";
import {BackToRecipesLink} from "../components/BackToRecipesLink";

export interface RecipeOverviewSceneProps {
  recipe: Recipe;
}

const renderIngredient = (ingredient: Ingredient) => (
  <div key={shortid.generate()}>{ingredient.quantity}x {ingredient.name} - {ingredient.form}</div>
);

class RecipeOverviewScene extends PureComponent<RecipeOverviewSceneProps> {
  constructor(props: RecipeOverviewSceneProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <BackToRecipesLink />

        <h3>Recipe</h3>
        <h1>{this.props.recipe.name}</h1>

        <div>
          <h3>Ingredients</h3>
          {this.props.recipe.ingredients.map(renderIngredient)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  recipe: state.recipeStore.find((recipe: Recipe) => recipe.id === ownProps.match.params.id) || emptyRecipe(),
});

export default connect<RecipeOverviewSceneProps>(mapStateToProps)(RecipeOverviewScene);
