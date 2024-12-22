# Recipe API  

## Overview  
The Recipe API is a Spring Boot application designed to manage and search recipes efficiently. It loads recipe data from an external dataset into an in-memory H2 database and provides RESTful endpoints for users to search and retrieve recipes based on various criteria.  

## Features  
- **Recipe Loading**: Import recipes from an external dataset into the database.  
- **Search Functionality**: Perform free-text searches for recipes by name or cuisine.  
- **Recipe Retrieval**: Access detailed information about specific recipes using their unique ID.  

## Technologies Used  
- **Backend Framework**: Spring Boot  
- **Database**: H2 Database (in-memory)  
- **Persistence**: JPA (Java Persistence API)  
- **Build Tool**: Maven  
- **API Documentation**: Swagger/OpenAPI  

## Prerequisites  
- **Java**: Version 11 or higher  
- **Maven**: Ensure Maven is installed and available in your system's PATH  

## Getting Started  

### Installation  
1. **Clone the repository:**  
    
   git clone <repository-url>  
   cd recipe-api  
 

2. **Build the project:**  
   
   ./mvnw clean install  
  

### Running the Application  
Start the application with the following command:  
 
./mvnw spring-boot:run  

The application will be accessible at `http://localhost:8080`.  

### API Endpoints  

#### 1. Load Recipes  
- **URL**: `POST /api/recipes/load`  
- **Description**: Loads recipes from an external dataset into the H2 database.  

#### 2. Search Recipes  
- **URL**: `GET /api/recipes/search`  
- **Query Parameter**:  
  - `query`: A text query for searching by recipe name or cuisine.  
- **Description**: Retrieves a list of recipes that match the search query.  

#### 3. Get Recipe by ID  
- **URL**: `GET /api/recipes/{id}`  
- **Description**: Fetches a recipe's details using its unique ID.  

## Configuration  
The application’s settings can be customized in the `application.properties` file, located in:  
`src/main/resources/application.properties`.  

## Database  
The application uses an in-memory H2 database, which resets on every application restart. You can access the H2 console at:  
```
http://localhost:8080/h2-console  
```  
- **Default JDBC URL**: `jdbc:h2:mem:testdb`  
- **Username**: `sa`  
- **Password**:   

## Testing  
Run the unit tests to verify the application’s functionality:  
  
./mvnw test  
 

## Logging and Exception Handling  
- **Logging**: Integrated logging for request tracking and error debugging.  
- **Error Handling**: Global exception handlers ensure meaningful and user-friendly error messages.  

## License  
This project is licensed under the [MIT License](LICENSE).  

## Acknowledgments  
- **Dataset**: [DummyJSON](https://dummyjson.com/recipes)  
- **Framework Documentation**: [Spring Boot](https://spring.io/projects/spring-boot)  
