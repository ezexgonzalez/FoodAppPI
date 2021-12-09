

export function getRecipes() {
    return function(dispatch) {
      return fetch("https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=843bcc0716944bf684275b4adfdb2328")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_RECIPES", payload: json });
        });
    };
  }
  