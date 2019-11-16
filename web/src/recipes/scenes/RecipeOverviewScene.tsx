import React, {PureComponent} from "react";
import {RouteComponentProps} from "react-router-dom";
import * as shortid from "shortid";
import {BackToRecipesLink} from "../components/BackToRecipesLink";
import {DIContainerContext} from "../../AppConfig";
import {Ingredient, Recipe} from "../../application/types";

interface RecipeOverviewSceneState {
  recipe: Recipe;
}

interface RecipeOverviewSceneProps extends RouteComponentProps {
}

const renderIngredient = (ingredient: Ingredient) => (
  <div key={shortid.generate()}>{ingredient.quantity}x {ingredient.name} - {ingredient.form}</div>
);

class RecipeOverviewScene extends PureComponent<RecipeOverviewSceneProps, RecipeOverviewSceneState> {
  public static contextType = DIContainerContext;
  public context!: React.ContextType<typeof DIContainerContext>;

  constructor(props: RecipeOverviewSceneProps) {
    super(props);
    this.state = {
      recipe: {
        id: "0",
        name: "",
        ingredients: []
      },
    };
  }

  public componentDidMount(): void {
    this.context.recipesGateway.findById((this.props.match.params as any).id).then((recipe: Recipe) => {
      this.setState({recipe});
    }).catch((error: Error) => console.error(error));
  }

  public render() {
    return (
      <div>
        <BackToRecipesLink/>

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
