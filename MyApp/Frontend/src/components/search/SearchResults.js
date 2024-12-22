// src/components/search/SearchResults.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results, isLoading, onSelect }) => {
  const navigate = useNavigate();

  const handleSelectRecipe = (recipeId) => {
    onSelect();
    navigate(`/recipe/${recipeId}`);
  };

  if (isLoading) {
    return <div className="p-4 text-gray-500 text-center">Loading...</div>;
  }

  if (results.length === 0) {
    return <div className="p-4 text-gray-500 text-center">No recipes found</div>;
  }

  return (
    <ul className="max-h-64 overflow-y-auto">
      {results.map((recipe) => (
        <li
          key={recipe.id}
          onClick={() => handleSelectRecipe(recipe.id)}
          className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 border-b last:border-b-0"
        >
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-900">{recipe.name}</div>
            <div className="text-sm text-gray-500">
              <span>Cuisine: {recipe.cuisine}</span>
              <span className="mx-2">•</span>
              <span>Rating: {recipe.rating}/5 ({recipe.reviewCount} reviews)</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;