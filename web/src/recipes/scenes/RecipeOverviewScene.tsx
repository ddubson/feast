import {observer} from "mobx-react";
import React, {PureComponent} from "react";
import {RouteComponentProps} from "react-router-dom";
import * as shortid from "shortid";
import {emptyRecipe, RecipeStore} from "../../core/RecipeStore";
import {Ingredient} from "../../shared-components/ingredient";
import {Recipe} from "../../shared-components/recipe";
import {BackToRecipesLink} from "../components/BackToRecipesLink";

interface RecipeOverviewSceneState {
  recipe: Recipe;
}

interface RecipeOverviewSceneProps extends RouteComponentProps {
  recipeStore: RecipeStore;
}

const renderIngredient = (ingredient: Ingredient) => (
  <div key={shortid.generate()}>{ingredient.quantity}x {ingredient.name} - {ingredient.form}</div>
);

@observer
class RecipeOverviewScene extends PureComponent<RecipeOverviewSceneProps, RecipeOverviewSceneState> {
  constructor(props: RecipeOverviewSceneProps) {
    super(props);
    this.state = {
      recipe: emptyRecipe(),
    };
  }

  public componentDidMount(): void {
    this.props.recipeStore.findById((this.props.match.params as any).id).then((recipe: Recipe) => {
      this.setState({ recipe });
    }).catch(error => console.error(error));
  }

  public render() {
    return (
      <div>
        <BackToRecipesLink />

        <h3>Recipe</h3>
        <h1>{this.state.recipe.name}</h1>

        <div>
          <h3>Ingredients</h3>
          {this.state.recipe.ingredients.map(renderIngredient)}
        </div>
      </div>
    );
  }
}

export default RecipeOverviewScene;
