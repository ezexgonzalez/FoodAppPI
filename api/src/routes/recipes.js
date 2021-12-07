const { Router } = require('express');
const { Recipe, Type } = require('../db.js');
const { Op } = require('sequelize');


const routerRecipes = Router();

routerRecipes.get("/", async (req, res, next)=>{

    const {name} = req.query;
    if(name){

        const recipe = await Recipe.findAll({
            where: {
               name:{[Op.substring]: name}
            } 
        })

        if(recipe.length > 0){
            return  res.send(recipe);
        }
    }
    res.status(404).send({
        msg: "recipe not found"
    });
});

routerRecipes.get("/:id", async (req, res, next) =>{

    const {id} = req.params;

    const recipe = await Recipe.findByPk(id, {
        include: [{
            model: Type,
            attributes: ['name'],
            through: {
              attributes: []
            }
          }]
    });



    if(recipe){
       return res.json(recipe);
    }

    res.status(404).send("recipe not found");
});

routerRecipes.post("/", async (req, res, next)=>{

    const { name,resume, types, punctuation, healthyLevel, steps } = req.body;

    const recipe = await Recipe.create({
        name: name.toLowerCase(),
        resume,
        punctuation,
        healthyLevel,
        steps
    });

    await recipe.addTypes(types);

    res.status(201).send({
        msg: "Ok"
    });

})


module.exports = routerRecipes;