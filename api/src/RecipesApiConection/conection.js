const fetch = require("node-fetch");
const {
   API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4
  } = process.env;


module.exports = {

    getAllRecipes : function (recipes){


       return fetch(`${API_KEY_4}`)
        .then(response => response.json())
        .then(json => {
            
           let allRecipes = json.results.concat(recipes)
            return allRecipes;
        });

    },
    getQueryRecipes : function (recipes, query){
        return fetch(`${API_KEY_4}`)
        .then(response => response.json())
        .then(json => {
            
          
            let filter = json.results.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

            let filterRecipes = filter.concat(recipes);

            return filterRecipes;
        });
    },
    getRecipeById: function(id){

    
        return fetch(`${API_KEY_4}`)
        .then(response => response.json())
        .then(json => {
            
            console.log(id);
            let filter = json.results.find(r => r.id === Number(id));
            return filter;
        });

    }





}