export interface IngredientDto {
  id: string;
  name: string;
  form: string;
  quantity: {
    value: number;
  };
  weight: {
    value: number;
    type: string;
  };
}