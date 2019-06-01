import React, {ChangeEvent, FormEvent} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {saveRecipe} from "../../core/recipe-store";
import {Recipe} from "../../shared-components/recipe";

export interface CreateRecipeSceneProps {
  saveRecipe: (recipe: Recipe) => void;
}

export interface CreateRecipeSceneState {
  recipeForm: {
    name: string;
  };
}

class CreateRecipeScene extends React.PureComponent<CreateRecipeSceneProps, CreateRecipeSceneState> {
  constructor(props: CreateRecipeSceneProps) {
    super(props);
    this.state = {
      recipeForm: {
        name: "",
      },
    };
  }

  public render() {
    return (<div>
      <Link to={"/"}>Back to Recipes</Link>

      <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="recipeName">Recipe Name</label>
        <input type="text"
               name="recipeName"
               value={this.state.recipeForm.name}
               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                 this.setState({recipeForm: {name: event.target.value}});
               }}
               placeholder={"Enter a recipe name."} />

        <input type="submit" value={"Create recipe"} />
      </form>
    </div>);
  }

  private handleSubmit(event: FormEvent): void {
    event.preventDefault();

    const {name} = this.state.recipeForm;

    const recipe: Recipe = {
      ingredients: [],
      name,
    };

    this.props.saveRecipe(recipe);
  }
}

export default connect<CreateRecipeSceneProps, CreateRecipeSceneState>(null, {saveRecipe})(CreateRecipeScene);
