import {Ingredient, IngredientForm, UnitOfMeasure, WithoutId} from "@ddubson/feast-domain";
import React, {FormEvent, useState} from "react";
import {Just, Maybe, Nothing} from "purify-ts";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";

type AddIngredientProps = {
  onAddIngredient: (ingredient: WithoutId<Ingredient>) => void;
}

const AddIngredient: React.FC<AddIngredientProps> = ({onAddIngredient}: AddIngredientProps) => {
  const [name, setName] = useState<Maybe<string>>(Nothing);
  const [form, setForm] = useState<Maybe<IngredientForm>>(Nothing);
  const [unitOfMeasure, setUnitOfMeasure] = useState<Maybe<UnitOfMeasure>>(Nothing);
  const [quantity, setQuantity] = useState<Maybe<string>>(Nothing);

  const onNameChange = (event: FormEvent<HTMLInputElement>) =>
    setName(Just((event.target as any).value));
  const onFormChange = (event: any) => {
    setForm(Just((event.target as any).value))
  }
  const onUnitOfMeasureChange = (event: any) => {
    setUnitOfMeasure(Maybe.fromPredicate(() => (event.target as any).value !== "", (event.target as any).value))
  };
  const onQuantityChange = (event: FormEvent<HTMLInputElement>) =>
    setQuantity(Just((event.target as any).value))
  const onAddIngredientSubmit = () => {
    onAddIngredient({
      name: name.orDefault(""),
      form: form,
      quantity: quantity.map(q => ({value: +q})),
      weight: Nothing,
      volume: Nothing
    });
  };

  return (
    <section className="p-my-3">
      <h3>Add an ingredient</h3>
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
        <label className="p-mb-1">Form</label>
        <Dropdown
          optionLabel="name"
          optionValue="value"
          options={Object.values(ingredientFormOptions)}
          placeholder={"e.g. Diced, Chopped, Minced, etc."}
          value={form.orDefault("N/A")}
          onChange={onFormChange}
        />
      </div>
      <div>
        <label className="p-mb-1">Unit of Measure</label>
        <Dropdown
          optionLabel="name"
          optionValue="value"
          options={Object.values(unitOfMeasureOptions)}
          placeholder={"e.g. Weight, Quantity, etc."}
          value={(unitOfMeasure.isNothing() ? "" : unitOfMeasure.extract())}
          onChange={onUnitOfMeasureChange}
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
        <Button
          aria-label="Add ingredient"
          label="Add ingredient"
          onClick={onAddIngredientSubmit}
        />
      </div>
    </section>
  )
}

const ingredientFormOptions: { [key in IngredientForm]: { name: string, value: IngredientForm } } = {
  "N/A": {name: "", value: "N/A"},
  "Chopped": {name: "Chopped", value: "Chopped"},
  "Cleaned": {name: "Cleaned", value: "Cleaned"},
  "Diced": {name: "Diced", value: "Diced"},
  "Ground": {name: "Ground", value: "Ground"},
  "Minced": {name: "Minced", value: "Minced"},
  "Zested": {name: "Zested", value: "Zested"},
};

const unitOfMeasureOptions: { [key in UnitOfMeasure | ""]: { name: string, value: UnitOfMeasure | "" } } = {
  "": {name: "", value: ""},
  "quantity": {name: "Quantity", value: "quantity"},
  "volume": {name: "Volume", value: "volume"},
  "weight": {name: "Weight ", value: "weight"},
}

export default AddIngredient;
