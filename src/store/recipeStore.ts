import { create } from 'zustand';
import { recipes as initialRecipes } from '../data/recipes';
import { Recipe } from '../types/recipe';

interface RecipeStore {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  selectedRegion: string;
  isAdminMode: boolean;
  searchQuery: string;
  setSelectedRegion: (region: string) => void;
  setCurrentRecipe: (recipe: Recipe | null) => void;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: string, recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  getFilteredRecipes: () => Recipe[];
  toggleAdminMode: () => void;
  searchRecipes: (query: string) => void;
  reset: () => void;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: initialRecipes,
  currentRecipe: null,
  selectedRegion: 'All Recipes',
  isAdminMode: false,
  searchQuery: '',
  
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  
  setCurrentRecipe: (recipe) => set({ currentRecipe: recipe }),
  
  addRecipe: (recipe) => 
    set((state) => ({ recipes: [...state.recipes, recipe] })),
  
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? updatedRecipe : recipe
      ),
    })),
  
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  
  searchRecipes: (query) => set({ searchQuery: query }),
  
  getFilteredRecipes: () => {
    const state = get();
    let filtered = state.recipes;

    // Filter by region
    if (state.selectedRegion !== 'All Recipes') {
      filtered = filtered.filter(
        (recipe) => recipe.category === state.selectedRegion
      );
    }

    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
          recipe.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  toggleAdminMode: () => set((state) => ({ isAdminMode: !state.isAdminMode })),

  reset: () => set({ 
    currentRecipe: null, 
    isAdminMode: false,
    searchQuery: '' 
  })
}));