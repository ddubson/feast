import {Ingredient, IngredientForm, WithoutId} from "@ddubson/feast-domain";
import React, {FormEvent, useState} from "react";
import {Just, Maybe, Nothing} from "purify-ts";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";

type AddIngredientProps = {
  onAddIngredient: (ingredient: WithoutId<Ingredient>) => void;
  isVisible: boolean;
}

const AddIngredient: React.FC<AddIngredientProps> = ({onAddIngredient, isVisible}: AddIngredientProps) => {
  const [name, setName] = useState<Maybe<string>>(Nothing);
  const [form, setForm] = useState<Maybe<IngredientForm>>(Nothing);
  const [quantity, setQuantity] = useState<Maybe<string>>(Nothing);

  if (!isVisible) {
    return <></>
  }

  const onNameChange = (event: FormEvent<HTMLInputElement>) =>
    setName(Just((event.target as any).value));
  const onFormChange = (event: any) => {
    setForm(Just((event.target as any).value))
  }
  const onQuantityChange = (event: FormEvent<HTMLInputElement>) =>
    setQuantity(Just((event.target as any).value))
  const onAddIngredientClick = (event: FormEvent) => {
    event.preventDefault();
    onAddIngredient({
      name: name.orDefault(""),
      form: form,
      quantity: quantity.map(q => ({value: +q})),
      weight: Nothing,
      volume: Nothing
    });
  };

  const ingredientFormOptions: { [key in IngredientForm]: { name: string, value: IngredientForm } } = {
    "N/A": {name: "", value: "N/A"},
    "Chopped": {name: "Chopped", value: "Chopped"},
    "Cleaned": {name: "Cleaned", value: "Cleaned"},
    "Diced": {name: "Diced", value: "Diced"},
    "Ground": {name: "Ground", value: "Ground"},
    "Minced": {name: "Minced", value: "Minced"},
    "Zested": {name: "Zested", value: "Zested"},
  };

  return (
    <section aria-label="Add an ingredient" className="p-my-3">
      <div>
        <label id="ingredientName" className="p-mb-1">Ingredient name</label>
        <InputText
          aria-labelledby="ingredientName"
          label="Ingredient name"
          value={name.orDefault("")}
          onChange={onNameChange}
        />
      </div>
      <div>
        <label htmlFor="add-form" className="p-mb-1">Form</label>
        <Dropdown
          ariaLabelledBy="add-form"
          ariaLabel="Add form"
          optionLabel="name"
          optionValue="value"
          inputId="add-form"
          data-test-id="add-form"
          options={Object.values(ingredientFormOptions)}
          placeholder={"e.g. Diced, Chopped, Minced, etc."}
          value={form.orDefault("N/A")}
          onChange={onFormChange}
        />
      </div>
      <div>
        <label id="quantity" className="p-mb-1">Quantity</label>
        <InputText
          aria-labelledby="quantity"
          label="Quantity"
          value={quantity.orDefault("")}
          onChange={onQuantityChange}
        />
      </div>
      <div>
        <Button aria-label="Add ingredient" label="Add ingredient"
                onClick={onAddIngredientClick}
        />
      </div>
    </section>
  )
}

export default AddIngredient;
