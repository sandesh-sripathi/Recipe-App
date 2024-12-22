package com.recipeapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class RecipesApiAssignmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecipesApiAssignmentApplication.class, args);
	}

}
