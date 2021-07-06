const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    get(){
        const DBValueId=this.getDataValue('id')
        return `DB${DBValueId}`
      }
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
    type:DataTypes.STRING
  },
  releaseDate:{
    type:DataTypes.DATEONLY,
  },
  rating:{
    type:DataTypes.INTEGER
  },
  platforms:{
    type:DataTypes.ARRAY(DataTypes.STRING)
  }
  });
};
