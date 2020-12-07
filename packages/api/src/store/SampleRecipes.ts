import {RecipeDetail, VolumeMeasure, Volumes, WithoutId} from "@ddubson/feast-domain";
import {Just, Nothing} from "purify-ts/Maybe";

export const garlicLimeShrimp: WithoutId<RecipeDetail> = {
  name: "Garlic Lime Shrimp Tacos",
  ingredients: Just([
    {
      id: "1",
      name: "Canola Oil",
      form: Nothing,
      quantity: Nothing,
      weight: Nothing,
      volume: Just<VolumeMeasure>({value: 1, volumeType: Volumes.tablespoon}),
    },
    {
      id: "2",
      name: "Corn Tortillas",
      form: Nothing,
      quantity: Just({value: 6}),
      weight: Nothing,
      volume: Nothing
    },
    {
      id: "3",
      name: "Medium Shrimp",
      form: Just("Cleaned"),
      quantity: Nothing,
      weight: Just({value: 1.0, type: "POUNDS"}),
      volume: Nothing
    },
    {
      id: "4",
      name: "Garlic Cloves",
      form: Just("Minced"),
      quantity: Just({value: 2}),
      weight: Nothing,
      volume: Nothing
    },
    {
      id: "5",
      name: "Salt",
      form: Nothing,
      quantity: Nothing,
      weight: Nothing,
      volume: Nothing
    },
    {
      id: "6",
      name: "Black pepper",
      form: Just("Ground"),
      quantity: Nothing,
      weight: Nothing,
      volume: Nothing
    },
    {
      id: "7",
      name: "Fresh lime",
      form: Just("Zested"),
      quantity: Just({value: 2}),
      weight: Nothing,
      volume: Nothing
    }
  ]),
  steps: Just([
    "Clean the shrimp; remove shells thoroughly; set aside",
    "Mince the garlic",
    "Zest two limes",
    "Juice two limes",
    "Heat up a saute pan with canola oil",
    "When heated, add shrimp and cook for 2mins",
    "Add garlic, and large pinch of salt and pepper",
    "Cook the shrimp, stirring frequently",
    "Turn off heat",
    "Stir in the zest and juice",
    "Taste and see if more salt is needed",
    "Serve"
  ].map((value: string, index: number) => ({stepNumber: index + 1, value})))
}
