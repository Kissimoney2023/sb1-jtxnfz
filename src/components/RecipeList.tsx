import React from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { RecipeCard } from './RecipeCard';
import { Search, Filter } from 'lucide-react';

export function RecipeList() {
  const { getFilteredRecipes, setCurrentRecipe, searchRecipes } = useRecipeStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const recipes = getFilteredRecipes();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchRecipes(value);
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes, ingredients, or cuisines..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          />
        </div>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No recipes found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setCurrentRecipe(recipe)}
            />
          ))}
        </div>
      )}
    </div>
  );
}