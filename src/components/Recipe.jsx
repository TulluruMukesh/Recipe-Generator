import React, { useState, useEffect } from "react";

const Recipe = () => {
  const [ingredients, setIngredients] = useState([]);
  const [servings, setServings] = useState(null); // To store the number of servings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "f246fac710b247628c0d0d1bd85434fe"; // Replace with your Spoonacular API key
  const recipeName = "butter chicken";

  // Function to fetch ingredients and servings
  async function fetchIngredients() {
    try {
      setLoading(true);
      setError(null);

      // Step 1: Search for the recipe to get the recipe ID
      const searchResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&apiKey=${apiKey}`
      );
      const searchData = await searchResponse.json();

      if (searchData.results.length === 0) {
        throw new Error("Recipe not found");
      }

      const recipeId = searchData.results[0].id;

      // Step 2: Fetch the recipe details using the recipe ID
      const detailsResponse = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
      );
      const recipeDetails = await detailsResponse.json();

      // Step 3: Extract ingredients and servings from the response
      const ingredientsList = recipeDetails.extendedIngredients.map(
        (ingredient) => ingredient.original
      );
      const recipeServings = recipeDetails.servings;

      setIngredients(ingredientsList); // Update the ingredients state
      setServings(recipeServings); // Update the servings state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      <h1>Butter Chicken</h1>
      {loading && <p>Loading ingredients...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <div>
          <p><strong>Servings:</strong> {servings}</p>

          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`ingredient-${index}`}
                value={ingredient}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor={`ingredient-${index}`} className="text-gray-700">
                {ingredient}
              </label>
            </div>
          ))}


        </div>
      )}
    </div>
  );
};

export default Recipe;
