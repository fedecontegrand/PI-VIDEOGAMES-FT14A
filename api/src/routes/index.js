const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Videogame} =require('../models/Videogame')
const {Genre}=require('../models/Genre')
const { Op } = require("sequelize");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/',async(req,res)=>{
    if(req.query.name){
        const searchedVideogame=req.query.name
        let games=await Videogame.findAll({
            where:{name:{[Op.like]:`${searchedVideogame}%`},
            limit:15,
            includes:[Genre]
        }})
        if(games===null)res.send({msg:"No games where found in our database."})
        else{
            let data=[]
            games.forEach(game=>data.push({
                name:game.name,
                urlImage:game.urlImage,
                genres:game.genres
            }))
            return res.json(data)
        }
    }
})

router.get('/',async (req,res)=>{
    let games=await Videogame.findAll({ 
                limit:15,
                includes:[Genre]
        })
        if(games!==null){
        let data=[]
        games.forEach(game=>data.push({
                name:game.name,
                urlImage:game.urlImage,
                genres:game.genres
            }))
            res.json(data)
    }
})


module.exports = router;
