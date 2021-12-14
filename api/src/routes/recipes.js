const { Router } = require('express');
const { Recipe, Type } = require('../db.js');
const { Op } = require('sequelize');
const {getAllRecipes, getQueryRecipes,getRecipeById} = require("../RecipesApiConection/conection");


const routerRecipes = Router();


routerRecipes.get("/:id", async (req, res, next) => {

    const { id } = req.params;

    try{

        const recipe = await Recipe.findByPk(id, {
            include: [{
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        });

        if (recipe) return res.json(recipe);

    }catch{
        try{
            const recipeApi = await getRecipeById(id);
        
            if(recipeApi) return res.json(recipeApi);

            res.status(404).send("recipe not found");
        }catch(e){
            res.status(404).json({
                msg: "error"
            })
                    
            
        }
        
    
        
    }
    
});

routerRecipes.get("/", async (req, res, next) => {
    const { name } = req.query;

    try{
    if (name) {

        const recipes = await Recipe.findAll({
            where: {
                name: { [Op.substring]: name }
            }
        })

       const filterRecipes = await getQueryRecipes(recipes, name);
       
       if(filterRecipes.length > 0){
        return res.json(filterRecipes);
       }else{
           return res.status(404).json({
               msg: "Recipes not Found"
           })
       }
        
    }else{

        const recipes = await Recipe.findAll({});
    
        const allRecipes = await getAllRecipes(recipes);
    
        return res.json(allRecipes);

    }
    }
    catch(e){

        res.status(404).json({
            error: "No hay peticiones disponibles",
            
        });

    }
    

});




routerRecipes.post("/", async (req, res, next) => {

    const { title, summary, types, spoonacularScore, healthScore, steps } = req.body;

    const recipe = await Recipe.create({
        title: title.toLowerCase(),
        summary,
        spoonacularScore,
        healthScore,
        steps
    });

    await recipe.addTypes(types);

    res.status(201).send({
        msg: "Ok"
    });

})


module.exports = routerRecipes;