// src/services/recipeService.js
const API_BASE_URL = 'http://localhost:8080/api';

export const recipeService = {
  async searchRecipes(searchText) {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/search?text=${encodeURIComponent(searchText)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw error;
    }
  },

  async getRecipeById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  },

  async loadAllRecipes() {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/load`);
      if (!response.ok) {
        throw new Error('Failed to load recipes');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading recipes:', error);
      throw error;
    }
  }
};