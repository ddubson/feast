import React, {FormEvent, useState} from "react";
import {Button} from "primereact/button";
import {Ingredient, WithoutId} from "@ddubson/feast-domain";
import IngredientPresenter, {toIngredientPresenter} from "../../../presenters/IngredientPresenter";
import CurrentIngredientsList from "./CurrentIngredientsList";
import AddIngredient from "./AddIngredient";
import {Panel} from "primereact/panel";

type NewIngredientSectionProps = {
  onNewIngredient: (ingredient: WithoutId<Ingredient>) => void;
};

const NewIngredientSection: React.FC<NewIngredientSectionProps> = ({onNewIngredient}: NewIngredientSectionProps) => {
  const [ingredients, setIngredients] = useState<IngredientPresenter[]>([]);
  const [showAddIngredientPanel, setShowAddIngredientPanel] = useState<boolean>(false);
  const onAddIngredient = (ingredient: WithoutId<Ingredient>) => {
    setIngredients([...ingredients, toIngredientPresenter(ingredient)]);
    onNewIngredient(ingredient);
    setShowAddIngredientPanel(false);
  };
  const onNewIngredientClick = (event: FormEvent) => {
    event.preventDefault();
    setShowAddIngredientPanel(true);
  }

  return (
    <Panel className={"p-mt-3"} header="Current Ingredients">
      <CurrentIngredientsList ingredientPresenters={ingredients} />
      <Button aria-label={"New ingredient"} className="p-my-3" onClick={onNewIngredientClick}
              disabled={showAddIngredientPanel}
              label={"New ingredient"} />
      <AddIngredient isVisible={showAddIngredientPanel} onAddIngredient={onAddIngredient} />
    </Panel>
  )
};

export default NewIngredientSection;
