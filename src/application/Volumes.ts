import {VolumeMeasure} from "./types";

type VolumeLabel = "Tablespoon";

type VolumeLabelAbbrev = "Tbsp";

type VolumeUnitOfMeasure = "milliliters" | "liters";

type VolumeLabelPlural = "tablespoons";

type VolumeLabelSingular = "tablespoon";

export const VolumeLabelPluralsLookup: { [key in VolumeLabel]: VolumeLabelPlural } = {
  Tablespoon: "tablespoons",
};

export interface CookingVolume {
  value: number;
  unitOfMeasurement: VolumeUnitOfMeasure;
  label: VolumeLabel;
  abbreviation: VolumeLabelAbbrev;
}

const tablespoon: CookingVolume = {
  value: 14.7868,
  unitOfMeasurement: "milliliters",
  label: "Tablespoon",
  abbreviation: "Tbsp",
};

export const singleOrPlural = (volumeMeasure: VolumeMeasure): VolumeLabelSingular | VolumeLabelPlural => {
  return (volumeMeasure.value === 1) ? "tablespoon" : VolumeLabelPluralsLookup[volumeMeasure.volumeType.label];
};

export const Volumes = {
  tablespoon,
};
