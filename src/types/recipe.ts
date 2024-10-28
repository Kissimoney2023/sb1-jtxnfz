export interface Recipe {
  id: string;
  name: string;
  description: string;
  totalTime: string;
  servings: number;
  difficulty: string;
  image: string;
  category: string;
  tags: string[];
  steps: string[];
  ingredients: string[];
}

export interface RecipeFormProps {
  recipe?: Recipe;
  onClose: () => void;
}