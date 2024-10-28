import React from 'react';
import { Clock, ChefHat, Users } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeDetailsProps {
  recipe: Recipe;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex gap-2 mb-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-sm bg-white/20 rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-3xl font-bold">{recipe.name}</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>{recipe.totalTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-indigo-600" />
              <span>{recipe.ingredients.length} ingredients</span>
            </div>
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
            {recipe.difficulty}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            <p className="text-gray-600">
              Follow along with our step-by-step guide to create this delicious {recipe.name}.
              Perfect for {recipe.tags.join(', ').toLowerCase()} cooking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};