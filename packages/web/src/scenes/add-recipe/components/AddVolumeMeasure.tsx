import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import React, {FormEvent, useState} from "react";
import {VolumeMeasureType} from "@ddubson/feast-domain";
import {Nothing, Maybe, Just} from "purify-ts";

const AddVolumeMeasure: React.FC = () => {
  const [amount, setAmount] = useState<Maybe<string>>(Nothing);
  const [volumeType, setVolumeType] = useState<Maybe<string>>(Nothing)

  const onAmountChange = (event: FormEvent<HTMLInputElement>) => {
    setAmount(Just((event.target as any).value));
  };

  const onVolumeTypeChange = (event: any) => {
    setVolumeType(Just((event.target as any).value));
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