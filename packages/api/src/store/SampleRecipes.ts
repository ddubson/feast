import {RecipeDetail, VolumeMeasure, Volumes, WithoutId } from "@feast/domain";
import {Just, Nothing} from "purify-ts/Maybe";

export const garlicLimeShrimp: WithoutId<RecipeDetail> = {
  name: "Garlic Lime Shrimp",
  ingredients: Just([
    {
      id: "1",
      name: "Canola Oil",
      form: Nothing,
      quantity: Nothing,
      weight: Nothing,
      volume: Just<VolumeMeasure>({value: 1, volumeType: Volumes.tablespoon}),
      // Ingredient(1L, name = "Canola Oil",
      // form = "", quantity = None, weight = None,
      // volume = Some(IngredientVolume(1f, VolumeMeasureName.TABLESPOON))),
      // Ingredient(2L, name = "Corn Tortillas",
      // form = "Medium Size", quantity = Some(Quantity(6f)), weight = None, volume = None),
      // Ingredient(3L, name = "Medium Shrimp",
      // form = "Cleaned", quantity = None, weight = Some(Weight(1f, WeightType.POUNDS)), volume = None),
      // Ingredient(4L, name = "Garlic Cloves", form = "Minced", quantity = Some(Quantity(2f)), weight = None, volume = None),
      // Ingredient(5L, name = "Salt", form = "Kosher", quantity = None, weight = None, volume = None),
      // Ingredient(6L, name = "Pepper", form = "Black", quantity = None, weight = None, volume = None),
      // Ingredient(7L, name = "Lime", form = "Zested; Juiced", quantity = Some(Quantity(2f)), weight = None, volume = None)
    }]),
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
