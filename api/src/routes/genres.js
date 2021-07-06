const axios=require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Genre}=require('../models/Genre')
const {apiKey} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/',(req,res)=>{
axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)
.then(response=>{
     response.results.forEach(result=>{
         Genre.create({name:result.name})
     })
 }).catch(err=>{
     return res.send({msg:"Ups.. we cant get the genres of our database."})})
})

router.get('/',async(req,res)=>{
const allGenres=await Genre.findAll()
res.json(allGenres)
})

module.exports = router;