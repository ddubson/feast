import React, {FormEvent, useState} from "react";
import {BackToRecipesLink} from "../view-recipe/components/BackToRecipesLink";
import {InputText} from "primereact/inputtext";
import {Just, Nothing} from "purify-ts";
import {Maybe} from "purify-ts/Maybe";
import {Button} from "primereact/button";

export interface CreateRecipeSceneProps {
  goToScene: (location: string) => void;
}

const AddRecipeScene = ({goToScene}: CreateRecipeSceneProps) => {
  const [recipeName, setRecipeName] = useState<Maybe<string>>(Nothing);

  const onRecipeNameChange = (e: FormEvent<HTMLInputElement>) => setRecipeName(Just((e.target as any).value))
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    goToScene("/");
  };

  return (
    <section>
      <BackToRecipesLink />
      <form onSubmit={onSubmit}>
        <section className="p-mt-3">
          <h3 className="p-mb-1">Recipe name</h3>
          <InputText
            id="recipeName"
            aria-label="Recipe name"
            label="Recipe name"
            value={recipeName.orDefault("")}
            onChange={onRecipeNameChange} />
        </section>

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
