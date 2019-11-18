interface Ingredient {
  name: string;
  quantity: number;
  form: string;
}

interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

export {Recipe, Ingredient};
