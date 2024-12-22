package com.recipeapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.recipeapi.dto.RecipeDTO;
import com.recipeapi.dto.RecipeResponse;
import com.recipeapi.model.Recipe;
import com.recipeapi.repository.RecipeRepository;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;

@Service
public class RecipeService {
	
	@Autowired
    private RecipeRepository recipeRepository;
	
    private final String externalApiUrl = "https://dummyjson.com/recipes";

    
    
	/*
	 * public void loadRecipesFromExternalSource() { RestTemplate restTemplate = new
	 * RestTemplate(); String url = "https://dummyjson.com/recipes"; Recipe[]
	 * recipes = restTemplate.getForObject(url, Recipe[].class); if (recipes !=
	 * null) { for (Recipe recipe : recipes) { recipeRepository.save(recipe); } } }
	 */
    
    @Retry(name = "recipeService")
    @CircuitBreaker(name = "recipeService", fallbackMethod = "fallbackLoadRecipes")
    @Cacheable("recipes")
    public boolean loadRecipes() {
    	RestTemplate restTemplate = new RestTemplate();
    	System.out.println("in load Recipes service!!!!!");
    	try {		
    		RecipeResponse recipeResponse = restTemplate.getForObject(externalApiUrl, RecipeResponse.class);
            if (recipeResponse != null && recipeResponse.getRecipes() != null) {
                for (RecipeDTO recipeDTO : recipeResponse.getRecipes()) {
                    Recipe recipe = convertToEntity(recipeDTO);
                    recipeRepository.save(recipe);
                }
                return true;
            }
    	}catch(Exception e){
    		System.out.println("In catch");
    		e.printStackTrace();
    	}
    	return false;
    }
    
    public void fallbackLoadRecipes(Throwable t) {
        // Fallback logic, e.g., log the error or load default data
        System.err.println("Failed to load recipes from external source: " + t.getMessage());
    }
    
    private Recipe convertToEntity(RecipeDTO recipeDTO) {
        Recipe recipe = new Recipe();
        recipe.setId(recipeDTO.getId());
        recipe.setName(recipeDTO.getName());
        recipe.setIngredients(recipeDTO.getIngredients());
        recipe.setInstructions(recipeDTO.getInstructions());
        recipe.setPrepTimeMinutes(recipeDTO.getPrepTimeMinutes());
        recipe.setCookTimeMinutes(recipeDTO.getCookTimeMinutes());
        recipe.setServings(recipeDTO.getServings());
        recipe.setDifficulty(recipeDTO.getDifficulty());
        recipe.setCuisine(recipeDTO.getCuisine());
        recipe.setCaloriesPerServing(recipeDTO.getCaloriesPerServing());
        recipe.setTags(recipeDTO.getTags());
        recipe.setUserId(recipeDTO.getUserId());
        recipe.setImage(recipeDTO.getImage());
        recipe.setRating(recipeDTO.getRating());
        recipe.setReviewCount(recipeDTO.getReviewCount());
        recipe.setMealType(recipeDTO.getMealType());
        return recipe;
    }

    public List<Recipe> searchRecipes(String text) {
        return recipeRepository.findByNameContainingIgnoreCaseOrCuisineContainingIgnoreCase(text, text);
    }

    public Recipe findRecipeById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }
   
}