import React, {FormEvent, useState} from "react";
import {Button} from "primereact/button";
import {Ingredient, WithoutId} from "@ddubson/feast-domain";
import {toIngredientPresenter} from "../../../presenters/IngredientPresenter";
import CurrentIngredientsList from "./CurrentIngredientsList";
import AddIngredient from "./AddIngredient";
import {Panel} from "primereact/panel";

type NewIngredientSectionProps = {
  onNewIngredient: (ingredient: WithoutId<Ingredient>) => void;
  ingredients: WithoutId<Ingredient>[];
};

const NewIngredientSection: React.FC<NewIngredientSectionProps> = ({ingredients, onNewIngredient}: NewIngredientSectionProps) => {
  const [showAddIngredientPanel, setShowAddIngredientPanel] = useState<boolean>(false);

  const onAddIngredient = (ingredient: WithoutId<Ingredient>) => {
    setShowAddIngredientPanel(false);
    onNewIngredient(ingredient);
  };
  const onNewIngredientClick = (event: FormEvent) => {
    event.preventDefault();
    setShowAddIngredientPanel(true);
  }

  return (
    <Panel className={"p-mt-3"} header="Current Ingredients">
      <CurrentIngredientsList ingredientPresenters={ingredients.map(toIngredientPresenter)} />
      <Button aria-label={"New ingredient"}
              className="p-my-3"
              onClick={onNewIngredientClick}
              disabled={showAddIngredientPanel}
              label={"New ingredient"} />
      {showAddIngredientPanel && <AddIngredient onAddIngredient={onAddIngredient} />}
    </Panel>
  )
};

export default NewIngredientSection;
