

export function getRecipes() {
    return function(dispatch) {
      return fetch("http://localhost:3001/recipes")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_RECIPES", payload: json });
        });
    };
  }
  

export function getRecipeById(id){

  return function(dispatch) {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_RECIPE_BY_ID", payload: json });
      });
  };

}