const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const State = require('./State.js');

class City extends Model { 

};

City.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize: db,
  tableName: 'cities',
  modelName: 'City'
});

State.hasMany(City);
City.belongsTo(State);

module.exports = City;