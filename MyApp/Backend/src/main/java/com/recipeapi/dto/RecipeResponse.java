package com.recipeapi.dto;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class RecipeResponse {
	private List<RecipeDTO> recipes;

	public List<RecipeDTO> getRecipes() {
		return recipes;
	}

	public void setRecipes(List<RecipeDTO> recipes) {
		this.recipes = recipes;
	}
	
}
