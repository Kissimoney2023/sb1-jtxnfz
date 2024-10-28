import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useRecipeStore } from '../../store/recipeStore';
import { RecipeFormProps } from '../../types/recipe';

export function RecipeForm({ recipe, onClose }: RecipeFormProps) {
  const { addRecipe, updateRecipe } = useRecipeStore();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    totalTime: '',
    servings: 4,
    difficulty: 'Easy',
    image: '',
    category: '',
    tags: [''],
    steps: [''],
    ingredients: ['']
  });

  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
    }
  }, [recipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipeData = {
      ...formData,
      id: recipe?.id || Date.now().toString(),
    };

    if (recipe) {
      updateRecipe(recipe.id, recipeData);
    } else {
      addRecipe(recipeData);
    }
    onClose();
  };

  const handleArrayInput = (
    field: 'ingredients' | 'steps' | 'tags',
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'steps' | 'tags') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field: 'ingredients' | 'steps' | 'tags', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {recipe ? 'Edit Recipe' : 'Add New Recipe'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Time</label>
            <input
              type="text"
              value={formData.totalTime}
              onChange={(e) => setFormData({ ...formData, totalTime: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Servings</label>
            <input
              type="number"
              value={formData.servings}
              onChange={(e) => setFormData({ ...formData, servings: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option>Italian</option>
              <option>Japanese</option>
              <option>Mexican</option>
              <option>Indian</option>
              <option>French</option>
              <option>Chinese</option>
              <option>Thai</option>
              <option>Mediterranean</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {['ingredients', 'steps', 'tags'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            {formData[field as keyof typeof formData].map((item: string, index: number) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayInput(
                      field as 'ingredients' | 'steps' | 'tags',
                      index,
                      e.target.value
                    )
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    removeArrayItem(
                      field as 'ingredients' | 'steps' | 'tags',
                      index
                    )
                  }
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem(field as 'ingredients' | 'steps' | 'tags')}
              className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" /> Add {field.slice(0, -1)}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {recipe ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </div>
    </form>
  );
}