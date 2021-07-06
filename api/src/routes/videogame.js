const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Videogame} =require('../models/Videogame')
const {Genre} =require('../models/Genre');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/:idVideogame',async(req,res)=>{
    const idVideogame=req.params.idVideogame
    const gameSearched=await Videogame.findByPk(idVideogame,{includes:[Genre]})
    if(gameSearched===null) res.send({msg:"There isnt any game with that ID."})
    else res.json(gameSearched)
})

router.post('/',async (req,res)=>{
    const {name,description,urlImage,releaseDate,rating,platforms,genres}=req.body
    const newGame=await Videogame.create({
        name:name,
        description:description,
        urlImage: urlImage || null,       //chequear que esto funcione
        releaseDate:releaseDate|| null,
        rating:rating || null,
        platforms:platforms
    })
    if(newGame!==null) res.send({msg:"Your game was added to our database."})
})

module.exports = router;