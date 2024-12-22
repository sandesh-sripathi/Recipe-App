# Recipe Frontend Application

## Overview
The Recipe Frontend Application is a single-page web application built with ReactJS. It provides an intuitive user interface to search for recipes using a typeahead (auto-complete) feature and displays detailed information about a selected recipe. The app communicates with the Recipe Backend API to fetch and display data.

## Features
- **Typeahead/Auto-Complete Search**: Users can search for recipes by name or cuisine. The search results dynamically appear in a dropdown as users type (after entering at least 3 characters).
- **Recipe Details Page**: Clicking on a recipe from the dropdown navigates to a detailed page showing the recipe's name, cuisine, and an image.
- **Responsive Design**: The UI is optimized for devices of all sizes.
- **Lazy Loading**: Efficient loading of components to enhance performance.
- **Atomic Design**: The UI follows a component-based architecture for better reusability and maintainability.

## Technologies Used
- ReactJS (Single Page Application)
- Tailwind CSS (for styling)
- Axios (for API calls)
- Jest and React Testing Library (for unit tests)

## Prerequisites
- Node.js (v16 or higher)
- Yarn or npm package manager

## Installation and Setup
1. Clone the repository:
   
    git clone <repository-url>
    cd recipe-app
  

2. Install dependencies:
    
    yarn install
  

3. Configure environment variables: Create a `.env` file in the root directory with the following keys:
 
    REACT_APP_API_BASE_URL=http://localhost:8080/api
  

4. Start the development server:

    yarn start

    The application will run at [http://localhost:3000](http://localhost:3000).

## Key Functionalities
### Typeahead Search
- The search bar appears in the header.
- Starts fetching results after the user types at least 3 characters.
- API integration via Axios to fetch recipes by name or cuisine.
- Displays recipe ID, name, and cuisine in the dropdown.

### Recipe Details Page
- Displays detailed information about a recipe, including an image.
- Renders on clicking a recipe from the dropdown.

## Testing
Run all tests:
yarn test

### Test Coverage
- Unit tests for components, services, and utilities using Jest.
- Coverage reports are generated in the `coverage/` directory.

### Configuration
- The API base URL is externalized in the `.env` file for better environment layering.

### Code Practices
- **Atomic Design**: Components are organized into logical categories for reusability and clarity.
- **Exception Handling**: Handles API errors gracefully with meaningful messages.
- **Responsive Design**: Leverages Tailwind CSS for mobile-first design.
- **Lazy Loading**: Uses React.lazy and Suspense for component-level lazy loading.

## License
This project is licensed under the MIT License.