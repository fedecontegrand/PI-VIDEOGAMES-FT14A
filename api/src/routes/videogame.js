require('dotenv').config();
const axios=require('axios')
const {apiKey}=process.env
const { v4: uuidv4 } = require("uuid");
const { Router } = require('express');
const {Videogame} =require('../db')
const {Genre} =require('../db');

const router = Router();


router.get('/:idVideogame',async(req,res)=>{
    
    const id=req.params.idVideogame

    if (id.includes("-")) {
        const gameDB = await Videogame.findOne(
            { where: 
                {id},
                include: [Genre]
            })
            
            
            let result={
                id:gameDB.id,
                name:gameDB.name,
                description:gameDB.description,
                releaseDate:gameDB.releaseDate,
                rating:gameDB.rating,
                platforms:gameDB.platforms,
                urlImage:gameDB.urlImage,
                genres:gameDB.genres
            }
            res.json(result)
    }
    else {
        const gameAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
        
        let result={
            id:gameAPI.data.id,
            name:gameAPI.data.name,
            description:gameAPI.data.description,
            releaseDate:gameAPI.data.released,
            rating:gameAPI.data.rating,
            platforms:gameAPI.data.platforms,
            urlImage:gameAPI.data.background_image,
            genres:gameAPI.data.genres
        }
        res.json(result)
    }

})

router.post('/',async (req,res)=>{
    const {name,description,urlImage,releaseDate,rating,platforms,genres}=req.body
    const newGame=await Videogame.create({
        id:uuidv4(),
        name,
        description,
        urlImage,       
        releaseDate,
        rating,
        platforms
    })
    
    genres.forEach(async(genre)=>{
        let genreFound=await Genre.findOne({where:{name:genre}})
            await newGame.addGenre(genreFound)
    })
    
    res.send({msg:"The game was successfully added to our database."})
})

module.exports = router;