import React from "react";
import {Ingredient} from "../../application/types";
import {Field, Form, Formik} from "formik";
import {RecipesService} from "../../application/services/RecipesService";

export interface CreateRecipeSceneProps {
  recipesService: RecipesService;
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

interface RecipeForm {
  recipeName: string;
  ingredients: Array<{
    name: string;
    quantity: number;
    form: string;
  }>;
}

function CreateRecipeScene(props: CreateRecipeSceneProps) {
  const initialValues: RecipeForm = {
    recipeName: "",
    ingredients: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("submitted: ", values);
      }}
    >
      {({values, handleSubmit}) => (
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}>
          <label htmlFor="recipeName">Recipe Name</label>
          <Field type="text" id="recipeName" name="recipeName"/>

          //TODO: FieldArray is next
          {/*<label htmlFor="ingredient">Add Ingredient</label>
          <Field type="text" id="ingredient" name={ingredient}/>

          {values.ingredients.map((ingredient, index) => (
            <React.Fragment>
              <label htmlFor="ingredient">Ingredient {index + 1}</label>
              <Field type="text" id="ingredient" name={ingredient}/>
            </React.Fragment>
          ))}*/}

          <button type={"submit"}>Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateRecipeScene;
