

export function getRecipes() {
    return function(dispatch) {
      return fetch("https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=d1f5548ccd4e4bfc89d5519e3065eacd")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_RECIPES", payload: json });
        });
    };
  }
  