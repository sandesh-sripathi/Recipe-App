package com.recipeapi.exception;

public class RecipeNotFoundException extends Exception{
	public RecipeNotFoundException(String name) {
		super(name);
	}
}
