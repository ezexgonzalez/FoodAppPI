const { Router } = require('express');
const { Recipe, Type } = require('../db.js');
const { Op } = require('sequelize');



const routerTypes = Router();



routerTypes.get("/", async (req , res ,next)=>{


    try{
       const types = await Type.bulkCreate([
            {name: "Gluten Free"},
            {name: "Ketogenic"},
            {name: "Vegetarian"},
            {name: "Lacto-Vegetarian"},
            {name: "Ovo-Vegetarian"},
            {name: "Vegan"},
            {name: "Pescetarian"},
            {name: "Paleo"},
            {name: "Primal"},
            {name: "Low FODMAP"},
            {name: "Whole30"}]);


        res.send(types);
    }catch(e){

       const types = await Type.findAll();

       res.send(types);

    }

});










module.exports = routerTypes;