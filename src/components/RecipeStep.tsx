import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AudioControls } from './AudioControls';
import { useRecipeStore } from '../store/recipeStore';
import { Recipe } from '../types/recipe';

interface RecipeStepProps {
  recipe: Recipe;
}

export function RecipeStep({ recipe }: RecipeStepProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const { setCurrentRecipe } = useRecipeStore();

  const goToNextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => setCurrentRecipe(null)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-700"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Recipes
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{recipe.name}</h1>
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {recipe.steps.length}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-700">{recipe.steps[currentStep]}</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous Step
          </button>

          <AudioControls text={recipe.steps[currentStep]} />

          <button
            onClick={goToNextStep}
            disabled={currentStep === recipe.steps.length - 1}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentStep === recipe.steps.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next Step
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}