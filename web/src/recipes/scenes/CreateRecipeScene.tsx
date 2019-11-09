import {Button, Input} from "@material-ui/core";
import update from "immutability-helper";
import React, {ChangeEvent, FormEvent, PureComponent} from "react";
import * as shortid from "shortid";
import {Ingredient} from "../../shared-components/ingredient";
import {Recipe} from "../../shared-components/recipe";
import {BackToRecipesLink} from "../components/BackToRecipesLink";
import {DIContainerContext} from "../../AppConfig";

export interface CreateRecipeSceneProps {
  history: {
    push: (location: string) => void;
  };
}

export interface CreateRecipeSceneState {
  recipeForm: {
    name: string;
    ingredients: Ingredient[];
  };
  ingredientToAdd: {
    name: string;
    quantity: number;
    form: string;
  };
}

class CreateRecipeScene extends PureComponent<CreateRecipeSceneProps, CreateRecipeSceneState> {
  public static contextType = DIContainerContext;
  public context!: React.ContextType<typeof DIContainerContext>;

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
    const {recipeForm, ingredientToAdd} = this.state;

    return (<div>
      <BackToRecipesLink/>

      <form onSubmit={this.handleSubmit.bind(this)}>
        <Input
          inputProps={{"data-recipe-name-input": true}}
          placeholder="Recipe Name"
          value={this.state.recipeForm.name}
          onChange={this.addRecipeName}
        />

        <div className="ingredient-list">
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
              <input data-ingredient-quantity
                     type="number"
                     value={ingredientToAdd.quantity}
                     onChange={this.addIngredientQuantity}
                     name="ingredientQuantity"
                     min={0}
                     max={100}
                     placeholder="Quantity"/>
              <input data-ingredient-form
                     type="text"
                     value={ingredientToAdd.form}
                     onChange={this.addIngredientForm}
                     name="ingredientForm"
                     placeholder="Form"/>
              <input data-ingredient-name
                     type="text"
                     value={ingredientToAdd.name}
                     onChange={this.addIngredientName}
                     name="ingredientName"
                     placeholder="Ingredient"/>
              <Button data-add-ingredient color="primary" onClick={this.addIngredientToIngredientList}>
                Add Ingredient
              </Button>
            </div>
          </div>
        </div>

        <Input data-add-recipe type="submit" value={"Create recipe"}/>
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

  private addIngredientToIngredientList(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const {name, form, quantity} = this.state.ingredientToAdd;
    const ingredient: Ingredient = {name, form, quantity};
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

    this.context.recipeGateway.saveRecipe(recipe).then(() => {
      this.props.history.push("/");
    });
  }
}

export default CreateRecipeScene;
