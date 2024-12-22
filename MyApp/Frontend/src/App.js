import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/search/SearchBar';

// Lazy load RecipeDetails
const RecipeDetails = lazy(() => import('./components/recipe/RecipeDetails'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="w-full bg-white shadow-sm">
          <div className="max-w-4xl mx-auto py-4 px-4">
            <h1 className="text-2xl font-bold text-gray-800">Recipe Finder</h1>
          </div>
        </div>
        
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="max-w-4xl mx-auto pt-12 px-4">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Recipe</h2>
                  <p className="text-gray-600">Search from our collection of delicious recipes</p>
                </div>
                <SearchBar />
              </div>
            } 
          />
          <Route 
            path="/recipe/:id" 
            element={
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-lg text-gray-600">Loading recipe details...</div>
                </div>
              }>
                <RecipeDetails />
              </Suspense>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;