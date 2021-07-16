require('dotenv').config();
const axios=require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Genre}=require('../db');
const {apiKey}=process.env;
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/',async(_req,res)=>{

 let genresAPI=await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)
 
 genresAPI.data.results.forEach(async(genre)=>{
     await Genre.findOrCreate({where:{name:genre.name}})  //SE CREA LA PRIMERA VEZ, SE BUSCA EL RESTO DE LAS VECES
 })
 let genresDB=await Genre.findAll()
 
 res.json(genresDB)
})

module.exports = router;