const { Router } = require('express');
const {Videogame} =require('../db')
const {Genre}=require('../db')
const { Op } = require("sequelize");
require('dotenv').config();
const axios=require('axios');
const {apiKey}=process.env;

const router = Router();


router.get('/',async(req,res,next)=>{
    const {name}=req.query
    
    if(name){
        
        try {
             let dBSearchedGames=await Videogame.findAll(
                {where:
                { name: {[Op.iLike]: '%'+`${name.replace("%20"," ")}`+'%'}},
                include: [Genre],
                limit:15
            }
           )

         let result=[]

         dBSearchedGames.forEach(game=>{
             result.push({
                 id:game.id,
                 author:"user",
                 name:game.name,
                 urlImage:game.urlImage,
                 genres:game.genres,
                 rating:game.rating
                })
            })

       

         let first100games=[]
         let apiRAWG=`https://api.rawg.io/api/games?search=${name}&key=${apiKey}`
         for(let i=0;i<5;i++){
            let apiGames=(await axios.get(apiRAWG)).data
            apiGames.results.forEach(game=>first100games.push(game))
            apiGames.next ? apiRAWG=apiGames.next :i=5;
            } 
        
        
         first100games.forEach(game=>{
            result.push({
                id:game.id,
                name:game.name,
                urlImage:game.background_image,
                genres:game.genres,
                rating:game.rating
            })
         })   
         
         !result[0] ? result={msg:"No game that matches with the specified name was found on our database."}:null
         return res.json(result)

        } catch (error) {
            res.json({msg:"No game that matches with the specified name was found on our database."})
            next(error)
        }
         
       

    }else{

        try {
           let anyGames=await Videogame.findAll({
            include:[Genre],
            limit:100
         })

        //  if(anyGames===null)return res.send({msg:"There is any game loaded in the database."})
        
         let result=[]

         anyGames.forEach(async(game)=>{

            let obj={
                id:game.id,
                author:"user",
                name:game.name,
                urlImage:game.urlImage,
                genres: game.genres,
                rating:game.rating
            }

            result.push(obj)
         })
        
         let first100games=[]
         let apiRAWG=`https://api.rawg.io/api/games?key=${apiKey}`
         for(let i=0;i<5;i++){
            let apiGames=(await axios.get(apiRAWG)).data
            apiGames.results.forEach(game=>first100games.push(game))
            apiRAWG=apiGames.next;
         }
      

         first100games.forEach(game=>{
            result.push({
                id:game.id,
                name:game.name,
                urlImage:game.background_image,
                genres:game.genres,
                rating:game.rating
            })
         })
        
         res.json(result) 

        } 
        catch (error) {
           
            next(error)
        }
        
    }
})

module.exports = router;
