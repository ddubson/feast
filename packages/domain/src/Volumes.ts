import {VolumeMeasure} from "./types";

type VolumeUnitOfMeasure = "milliliters" | "liters";

export interface CookingVolume {
  value: number;
  unitOfMeasurement: VolumeUnitOfMeasure;
  label: "Tablespoon" | string;
  abbreviation: "Tbsp" | string;
}

const tablespoon: CookingVolume = {
  value: 14.7868,
  unitOfMeasurement: "milliliters",
  label: "Tablespoon",
  abbreviation: "Tbsp",
};

export const Volumes = {
  tablespoon,
};
