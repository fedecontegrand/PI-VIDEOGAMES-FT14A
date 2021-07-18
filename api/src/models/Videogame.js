const { DataTypes, DATEONLY } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
      },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  urlImage:{
    type:DataTypes.STRING(1000)
  },
  releaseDate:{
    type:DataTypes.DATEONLY,
  },
  rating:{
    type:DataTypes.INTEGER
  },
  platforms:{
    type:DataTypes.ARRAY(DataTypes.STRING),
    allowNull:false
  }
  });
};
