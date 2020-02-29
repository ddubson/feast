type VolumeType = "TABLESPOON";

export interface StepDto {
  stepNumber: number;
  stepText: string;
}

export interface RecipeDto {
  id: string;
  name: string;
  ingredients: IngredientDto[];
  steps: StepDto[];
}

export interface IngredientDto {
  id: string;
  name: string;
  form: string | null;
  quantity: {
    value: number;
  };
  weight: {
    value: number;
    type: string;
  };
  volume: {
    value: number;
    type: VolumeType;
  } | null;
}
