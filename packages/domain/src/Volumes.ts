type VolumeUnitOfMeasure = "milliliters" | "liters";

export type VolumeMeasureType = "tablespoon" | "teaspoon" | "cup";

type VolumeMeasureAbbr = "tbsp" | "tsp" | "cups"

export interface CookingVolume {
  id: VolumeMeasureType,
  value: number;
  unitOfMeasurement: VolumeUnitOfMeasure;
  abbreviation: "Tbsp" | string;
}

const tablespoon: CookingVolume = {
  id: "tablespoon",
  value: 14.7868,
  unitOfMeasurement: "milliliters",
  abbreviation: "Tbsp",
};

export const VolumeMeasureTypePlural: { [key in VolumeMeasureType]: string } = {
  "tablespoon": "tablespoons",
  "teaspoon": "teaspoons",
  "cup": "cups"
};

export const VolumeMeasureTypeAbbr: { [key in VolumeMeasureType]: VolumeMeasureAbbr } = {
  "tablespoon": "tbsp",
  "teaspoon": "tsp",
  "cup": "cups"
}

export interface VolumeMeasure {
  value: number;
  type: VolumeMeasureType;
}

export const Volumes = {
  tablespoon,
};
