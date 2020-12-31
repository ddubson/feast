import React, {FormEvent, useState} from "react";
import {BackToRecipesLink} from "../view-recipe/components/BackToRecipesLink";
import {InputText} from "primereact/inputtext";
import {Just, Nothing} from "purify-ts";
import {Maybe} from "purify-ts/Maybe";
import {Button} from "primereact/button";
import {Ingredient, RecipeDetail, WithoutId} from "@ddubson/feast-domain";
import NewIngredientSection from "./components/NewIngredientSection";

export interface AddRecipeSceneProps {
  goToScene: (location: string) => void;
  saveRecipe: (recipe: WithoutId<RecipeDetail>) => Promise<RecipeDetail>;
};

const AddRecipeScene = ({goToScene, saveRecipe}: AddRecipeSceneProps) => {
  const [recipeName, setRecipeName] = useState<Maybe<string>>(Nothing);
  const [ingredients, setIngredients] = useState<WithoutId<Ingredient>[]>([]);
  const onRecipeNameChange = (e: FormEvent<HTMLInputElement>) => setRecipeName(Just((e.target as any).value))
  const onNewIngredient = (ingredient: WithoutId<Ingredient>) => {
    setIngredients([...ingredients, ingredient]);
  }
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    saveRecipe({
      name: recipeName.orDefault(""),
      ingredients: ingredients.map(i => ({...i, id: 'STUB'})),
      steps: []
    }).then((savedRecipe: RecipeDetail) => {
      goToScene("/");
    }).catch((e) => console.error(e));
  };

  return (
    <section>
      <BackToRecipesLink />
      <form onSubmit={onSubmit}>
        <section className="p-mt-3">
          <h3 className="p-mb-1">Recipe name</h3>
          <InputText
            required
            id="recipeName"
            aria-label="Recipe name"
            label="Recipe name"
            value={recipeName.orDefault("")}
            onChange={onRecipeNameChange} />
        </section>

        <NewIngredientSection ingredients={ingredients} onNewIngredient={onNewIngredient} />

        <Button type="submit"
                className="p-mt-3"
                label="Add recipe"
                aria-label="Add recipe"
                icon="pi pi-check" />
      </form>
    </section>
  )
}

export default AddRecipeScene;
