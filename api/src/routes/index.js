const { Router } = require('express');
const {Videogame} =require('../db')
const {Genre}=require('../db')
const { Op, Sequelize } = require("sequelize");
require('dotenv').config();
const axios=require('axios');
const {apiKey}=process.env;

const router = Router();


router.post('/',async(req,res,next)=>{
    const {name}=req.query


    const {genres}=req.body.filters
    const {source}=req.body.filters
    const {order}=req.body.filters

    console.log(req.body.filters)
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
            let apiGames=[]
            let result=[]
            let orderSt=""
            let genresSt=""
            let orderArray=[]

            order!=="select" ? orderSt=`&ordering=${order}` :null
            genres!=="any" ? genresSt=`&genres=${genres.toLowerCase()}` :null

            if(order==="rating") orderArray=[["rating"]]
            else if(order==="-rating") orderArray=[["rating","DESC"]]
            else if(order==="name") orderArray=[["name"]]
            else if(order==="-name") orderArray=[["name","DESC"]]

            if(source!=="api"){
                    if (order!=="select" && genres!=="any"){
                        dbGames=await Videogame.findAll({
                            include:{model:Genre,where:{name:genres}},
                            limit:100,
                            order:orderArray
                        })
                    }
                    else if(order==="select" && genres!=="any"){
                        dbGames=await Videogame.findAll({
                            include:{model:Genre,where:{name:genres}},
                            limit:100,
                        })
                    }
                    else if(order!=="select" && genres==="any"){
                        dbGames=await Videogame.findAll({
                            include:Genre,
                            limit:100,
                            order:orderArray
                        }) 
                    }
                    else if(order==="select" && genres==="any"){
                        dbGames=await Videogame.findAll({
                            include:Genre,
                            limit:100,
                        })
                    }
                    result=result.concat(dbGames)
                }
                
            if(source!=="database"){
               
                    let apiRAWG=`https://api.rawg.io/api/games?${orderSt}${genresSt}&page_size=40&key=${apiKey}`
        
                    apiGames=(await axios.get(apiRAWG)).data
        
                    apiGames.results.forEach(game=>
                            result.push(
                                    {
                                        id:game.id,
                                        name:game.name,
                                        urlImage:game.background_image,
                                        genres:game.genres,
                                        rating:game.rating
                                    }
                            )
                    )

            }
            
            result[0] ? res.json(result) : res.send("No games found")

        } 
        catch (error) {
           
            next(error)
        }
        
    }
})

module.exports = router;
