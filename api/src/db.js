require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env;


const sequelize = new Sequelize(`postgres://qrnjhhvbojkreg:af881c035ce77a95e33bb486f52234425d8f68cfd5cac88f710c9380dccc2b11@ec2-3-228-86-183.compute-1.amazonaws.com:5432/d13p4ak6sihg6m`, {
  pool: {
  max: 3,
  min: 1,
  idle: 10000,
},
dialectOptions: {
  ssl: {
    require: true,
    // Ref.: https://github.com/brianc/node-postgres/issues/2009
    rejectUnauthorized: false,
  },
  keepAlive: true,
},
ssl: true,});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame,Genre } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genre,{through:"videogames_genres"})
Genre.belongsToMany(Videogame,{through:"videogames_genres"})


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
