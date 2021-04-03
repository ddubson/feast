export type WeightType = "pounds";

export type Weight = {
  value: number;
  type: WeightType;
}

type WeightAbbr = "lbs";

export const WeightTypeAbbr: { [key in WeightType]: WeightAbbr } = {
  pounds: "lbs",
};
