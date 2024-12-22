import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star } from 'lucide-react';
import { recipeService } from '../../services/recipeService';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        const data = await recipeService.getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        setError('Failed to load recipe details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="text-lg text-gray-600">Loading recipe details...</div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="text-red-500 mb-4">{error || 'Recipe not found'}</div>
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:text-blue-700 bg-white px-4 py-2 rounded-lg shadow-sm"
        >
          Return to search
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 pb-12">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 bg-white px-4 py-2 rounded-lg shadow-sm"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to search
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {recipe.image && (
            <div className="w-full h-[400px] relative">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
              <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">
                {recipe.name}
              </h1>
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center gap-6 mb-6 text-gray-600">
              <div className="flex items-center">
                <Clock className="mr-2" size={20} />
                <span>Prep: {recipe.prepTimeMinutes}min • Cook: {recipe.cookTimeMinutes}min</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2" size={20} />
                <span>Serves {recipe.servings}</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-2" size={20} fill="gold" />
                <span>{recipe.rating} ({recipe.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="inline-block bg-orange-100 text-orange-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                {recipe.difficulty}
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                {recipe.cuisine}
              </span>
              {recipe.tags.map(tag => (
                <span key={tag} className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="list-disc list-inside space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ol className="list-decimal list-inside space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Calories:</span> {recipe.caloriesPerServing} per serving
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">Meal Type:</span> {recipe.mealType.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;