const { Op } = require('sequelize');
const CityModel = require('../models/City');
const StateModel = require('../models/State');

class CityController {
  
  index = async (req, res, next) => {
    const cities = await CityModel.findAll({
        include: [{
            model: StateModel,
            required:false,
            attributes:['name']
        }]
    })
    res.json(cities)
  }

  create = async (req,res,next) => {
    try {
        const data = await this.validateData(req.body);
        console.log(data.name)

        const user = await CityModel.create(data);

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

  show = async (req,res,next) => {
    const user = await CityModel.findByPk(req.params.cityId);
res.json(user);
}
  
update = async (req,res,next) => {
    try {
        const id = req.params.cityId;
        const data = await this.validateData(req.body, id);
        await CityModel.update(data, {
          where: {
            id:id
          }
        });
        res.json(await CityModel.findByPk(id));
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
    
    delete = async (req,res,next) => {
      await CityModel.destroy({
        where: {
          id: req.params.cityId
        }
      });
      res.json({});
      }
      
    

validateData = async (data, id) => {
    const attributes = ['name','StateId'];
    const user = {};
    for (const attribute of attributes) {
      if (! data[attribute]){
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      user[attribute] = data[attribute];
    }  
    return user;
    }

}
module.exports = new CityController;