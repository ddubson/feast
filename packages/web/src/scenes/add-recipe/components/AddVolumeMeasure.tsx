import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import React, {FormEvent, useState} from "react";
import {VolumeMeasure, VolumeMeasureType} from "@ddubson/feast-domain";
import {Nothing, Maybe, Just} from "purify-ts";
import {Button} from "primereact/button";

type AddVolumeMeasureProps = {
  onAddVolumeMeasure: (volumeMeasure: VolumeMeasure) => void;
};

const AddVolumeMeasure: React.FC<AddVolumeMeasureProps> = ({ onAddVolumeMeasure }: AddVolumeMeasureProps) => {
  const [amount, setAmount] = useState<Maybe<string>>(Nothing);
  const [volumeType, setVolumeType] = useState<Maybe<string>>(Nothing)

  const onAmountChange = (event: FormEvent<HTMLInputElement>) => {
    setAmount(Just((event.target as any).value));
  };

  const onVolumeTypeChange = (event: any) => {
    setVolumeType(Just((event.target as any).value));
  };

  const onSubmit = () => {
    const volumeMeasure: VolumeMeasure = {
      value: +amount,
      type: volumeType
    }
    onAddVolumeMeasure(volumeMeasure);
  };

  return (
    <div>
      <label id="amountId" className="p-mb-1">Amount</label>
      <InputText
        aria-labelledby="amountId"
        label="amount"
        value={amount.orDefault("")}
        onChange={onAmountChange}
      />
      <label id="type" className="p-mb-1">Type</label>
      <Dropdown
        optionLabel="name"
        optionValue="value"
        options={Object.values(volumeTypeOptions)}
        placeholder={"e.g. Tablespoons, Cups, etc."}
        value={volumeType.orDefault("")}
        onChange={onVolumeTypeChange}
      />
      <Button aria-label={"Add volume measure"}
              className="p-my-3"
              onClick={onSubmit}
              label={"Add volume measure"} />
    </div>
  )
};

const volumeTypeOptions: { [key in VolumeMeasureType | ""]: { name: string, value: VolumeMeasureType | "" } } = {
  "": {name: "", value: ""},
  "tablespoon": {name: "Tablespoon", value: "tablespoon"},
  "teaspoon": {name: "Teaspoon", value: "teaspoon"},
  "cup": {name: "Cup ", value: "cup"},
}

export default AddVolumeMeasure;