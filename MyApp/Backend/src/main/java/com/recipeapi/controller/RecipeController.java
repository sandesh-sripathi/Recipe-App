package com.recipeapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.recipeapi.exception.RecipeNotFoundException;
import com.recipeapi.model.Recipe;
import com.recipeapi.service.RecipeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/recipes")
@Tag(name = "Recipe Management System")
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {
	
	@Operation(summary = "Get a sample recipe", description = "Retrieve a sample recipe")
    @GetMapping("/sample")
    public ResponseEntity<String> getSampleRecipe() {
        return ResponseEntity.ok("Sample Recipe");
    }
	
	@Autowired
    private RecipeService recipeService;

	@Operation(summary = "Load recipes from external source", description = "Loads recipes from a third-party API and stores them in the in-memory database")
    @GetMapping("/load")
    public ResponseEntity<String> loadRecipes() throws RecipeNotFoundException {
    	System.out.println("Hi Getting Started!!!!!!!!!!");
    	boolean isLoaded = recipeService.loadRecipes();
        if(isLoaded){
        	return new ResponseEntity<>("loaded successfully",HttpStatus.CREATED);
        }else {
        	throw new RecipeNotFoundException("Unsuccessful");
        }
    }
    
	@Operation(summary = "Get a recipe by Id", description = "Provide an ID to look up a specific recipe from the in-memory database")
    @GetMapping("/{id}") 
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) throws RecipeNotFoundException { 
    	Recipe recipe = recipeService.findRecipeById(id);
    	if(recipe != null) {
    		System.out.println("Recipe is found");
    		return ResponseEntity.ok(recipe);
    	}else {
    		System.out.println("No Recipe found with the id : "+id);
    		throw new RecipeNotFoundException("No Recipe found with the id : "+id);
    	}
    	 
    }
    
	@Operation(summary = "Search recipes by text", description = "Search for recipes by name or cuisine using a free text search")
    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam String text) throws RecipeNotFoundException {
        List<Recipe> recipes = recipeService.searchRecipes(text);
        if (recipes.isEmpty()) {
            throw new RecipeNotFoundException("No recipes found for the search text: " + text);
        }
        return ResponseEntity.ok(recipes);
    }
	
	@Operation(summary = "Post Method Get a recipe by Id", description = "Post - Provide an ID to look up a specific recipe from the in-memory database")
    @PostMapping("/id") 
    public ResponseEntity<Recipe> getRecipePostById(@RequestBody Recipe recipeget) throws RecipeNotFoundException { 
    	Recipe recipe = recipeService.findRecipeById(recipeget.getId());
    	if(recipe != null) {
    		System.out.println("Recipe is found");
    		return ResponseEntity.ok(recipe);
    	}else {
    		System.out.println("No Recipe found with the id : "+recipeget.getId());
    		throw new RecipeNotFoundException("No Recipe found with the id : "+recipeget.getId());
    	}
    	 
    }

}