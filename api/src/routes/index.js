const { Router } = require('express');
const {Videogame} =require('../db')
const {Genre}=require('../db')
const { Op } = require("sequelize");
require('dotenv').config();
const axios=require('axios');
const {apiKey}=process.env;

const router = Router();


router.post('/:page',async(req,res,next)=>{
    const {name}=req.query

    const page=req.params.page
    const {genres}=req.body.filters
    const {source}=req.body.filters

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
             result.push(game)
            })

       


         let apiRAWG=`https://api.rawg.io/api/games?search=${name}&key=${apiKey}`
         for(let i=0;i<5;i++){
            let apiGames=(await axios.get(apiRAWG)).data
            apiGames.results.forEach(game=>result.push({
                id:game.id,
                name:game.name,
                urlImage:game.background_image,
                genres:game.genres,
                rating:game.rating
            }))
            apiGames.next ? apiRAWG=apiGames.next :i=5;
            } 
         
         !result[0] ? result={msg:"No game that matches with the specified name was found on our database."}:null
         return res.json(result)

        } catch (error) {
            res.json({msg:"No game that matches with the specified name was found on our database."})
            next(error)
        }
         
       

    }else{

        try {
            let dbGames=[]
            let result=[]
            console.log(genres)
            console.log(source)
            
            if(genres==="any"){
                if(source!=="api"){
                    if(page===1){
                        dbGames=await Videogame.findAll({
                        include:[Genre],
                        limit:100
                        })
                    }
                    dbGames[0] ? result.concat(dbGames) : null
                }
                if(source!=="database"){
                    let apiRAWG=`https://api.rawg.io/api/games?key=${apiKey}`
                    for(let i=1;i<6;i++){
                        let apiGames=(await axios.get(apiRAWG)).data
                        if(page==i){
                            apiGames.results.forEach(game=>
                                result.push({
                                    id:game.id,
                                    name:game.name,
                                    urlImage:game.background_image,
                                    genres:game.genres,
                                    rating:game.rating
                                }))
                            i=5
                        }
                        else apiRAWG=apiGames.next;
                    }
                }
                return res.json(result)
            }

            else {
               if(source!=="api"){
                if(page==1)dbGames=await Videogame.findAll({include:{model:Genre,where:{name:genres}},limit:100})
               }
               dbGames[0] ? result.concat(dbGames) :null
               if(source!=="database"){
                let apiRAWG=`https://api.rawg.io/api/games?genres=${genres.toLocaleLowerCase()}&key=${apiKey}`
                
                    for(let i=1;i<6;i++){
                        
                        let apiGames=(await axios.get(apiRAWG)).data.results  // ver que onda results                 
                        if(page==i){
                          apiGames.forEach(game=>
                            result.push({
                            id:game.id,
                            name:game.name,
                            urlImage:game.background_image,
                            genres:game.genres,
                            rating:game.rating
                            }))
                          i=5  
                        } else apiRAWG=apiGames.next;
                    }
                }
                return res.json(result)
            }

        } 
        catch (error) {
           
            next(error)
        }
        
    }
})

module.exports = router;
