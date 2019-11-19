import React from "react";
import {Ingredient} from "../../application/types";
import {useFormik} from "formik";
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
  name: string;
}

function CreateRecipeScene(props: CreateRecipeSceneProps) {
  const formik = useFormik<RecipeForm>({
    initialValues: {
      name: "",
    },
    onSubmit: (values: RecipeForm) => {
      console.log("submitted: ", values);
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }}>
      <label htmlFor={name}>Recipe Name</label>
      <input type="text" id="name"
             onChange={formik.handleChange}
             value={formik.values.name}/>

      <button type={"submit"}>Submit</button>
    </form>
  );
};

export default CreateRecipeScene;