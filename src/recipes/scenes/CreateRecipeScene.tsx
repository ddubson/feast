import update from "immutability-helper";
import React, {ChangeEvent, FormEvent} from "react";
import {connect} from "react-redux";
import * as shortid from "shortid";
import {RecipeStoreAction, saveRecipe} from "../../core/recipe-store";
import {Ingredient} from "../../shared-components/ingredient";
import {Recipe} from "../../shared-components/recipe";
import {BackToRecipesLink} from "../components/BackToRecipesLink";

export interface CreateRecipeSceneProps {
  saveRecipe: (recipe: Recipe) => RecipeStoreAction;
  history: {
    push: (location: string) => void;
  };
}

export interface CreateRecipeSceneState {
  recipeForm: {
    name: string;
    ingredients: Array<{
      name: string;
      quantity: number;
      form: string;
    }>;
  };
  ingredientToAdd: {
    name: string;
    quantity: number;
    form: string;
  };
}

class CreateRecipeScene extends React.PureComponent<CreateRecipeSceneProps, CreateRecipeSceneState> {
  constructor(props: CreateRecipeSceneProps) {
    super(props);
    this.state = {
      ingredientToAdd: {
        form: "",
        name: "",
        quantity: 0,
      },
      recipeForm: {
        ingredients: [],
        name: "",
      },
    };
    this.addRecipeName = this.addRecipeName.bind(this);
    this.addIngredientQuantity = this.addIngredientQuantity.bind(this);
    this.addIngredientForm = this.addIngredientForm.bind(this);
    this.addIngredientName = this.addIngredientName.bind(this);
    this.addIngredientToIngredientList = this.addIngredientToIngredientList.bind(this);
  }

  public render() {
    const {recipeForm} = this.state;

    return (<div>
      <BackToRecipesLink />

      <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="recipeName">Recipe Name</label>
        <input type="text"
               name="recipeName"
               value={this.state.recipeForm.name}
               onChange={this.addRecipeName}
               placeholder={"Enter a recipe name."} />

        <div>
          <div>Ingredients</div>
          <div>
            {(recipeForm.ingredients.length > 0 ?
              recipeForm.ingredients.map((ingredient: Ingredient) => (
                <div key={shortid.generate()}>{ingredient.quantity} {ingredient.name}</div>
              )) : "No ingredients yet.")}
          </div>
          <div>
            <div>Add Ingredient</div>
            <div>
              <input type="number"
                     value={this.state.ingredientToAdd.quantity}
                     onChange={this.addIngredientQuantity}
                     name="ingredientQuantity"
                     min={0}
                     max={100}
                     placeholder="Quantity" />
              <input type="text" value={this.state.ingredientToAdd.form}
                     onChange={this.addIngredientForm}
                     name="ingredientForm"
                     placeholder="Form" />
              <input type="text" value={this.state.ingredientToAdd.name}
                     onChange={this.addIngredientName}
                     name="ingredientName"
                     placeholder="Ingredient" />
              <button onClick={this.addIngredientToIngredientList}>Add Ingredient</button>
            </div>
          </div>
        </div>

        <input type="submit" value={"Create recipe"} />
      </form>
    </div>);
  }

  private addRecipeName(event: ChangeEvent<HTMLInputElement>): void {
    this.setState(update(this.state, {recipeForm: {name: {$set: event.target.value}}}));
  }

  private addIngredientQuantity(event: ChangeEvent<HTMLInputElement>): void {
    this.setState(update(this.state, {ingredientToAdd: {quantity: {$set: parseInt(event.target.value, 10)}}}));
  }

  private addIngredientForm(event: ChangeEvent<HTMLInputElement>): void {
    this.setState(update(this.state, {ingredientToAdd: {form: {$set: event.target.value}}}));
  }

  private addIngredientName(event: ChangeEvent<HTMLInputElement>): void {
    this.setState(update(this.state, {ingredientToAdd: {name: {$set: event.target.value}}}));
  }

  private addIngredientToIngredientList(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const ingredient = this.state.ingredientToAdd;
    this.setState(update(this.state, {recipeForm: {ingredients: {$push: [ingredient]}}}));
  }

  private handleSubmit(event: FormEvent): void {
    event.preventDefault();

    const {name, ingredients} = this.state.recipeForm;

    const recipe: Recipe = {
      id: shortid.generate(),
      ingredients,
      name,
    };

    this.props.saveRecipe(recipe);
    this.props.history.push("/");
  }
}

export default connect<CreateRecipeSceneProps, CreateRecipeSceneState>(
  null,
  {saveRecipe})(CreateRecipeScene);
