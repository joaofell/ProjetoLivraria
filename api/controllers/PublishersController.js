const { Op } = require('sequelize');
const CityModel = require('../models/City');
const PublisherModel = require('../models/Publisher');

class PublisherController {
  
  index = async (req, res, next) => {
    const publisher = await PublisherModel.findAll({
        include: [{
            model: CityModel,
            required:false,
            attributes:['name']
        }]
    })
    res.json(publisher)
  }

  create = async (req,res,next) => {
    try {
        const data = await this.validateData(req.body);
        console.log(data.name)

        const user = await PublisherModel.create(data);

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

  show = async (req,res,next) => {
    const user = await PublisherModel.findByPk(req.params.publisherId);
res.json(user);
  }

  update = async (req,res,next) => {
    try {
        const id = req.params.publishersId;
        const data = await this.validateData(req.body, id);
        await PublisherModel.update(data, {
          where: {
            id:id
          }
        });
        res.json(await PublisherModel.findByPk(id));
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
    
    delete = async (req,res,next) => {
      await PublisherModel.destroy({
        where: {
          id: req.params.publishersId
        }
      });
      res.json({});
      }
      
    


  validateData = async (data, id) => {
    const attributes = ['name','CityId'];
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
module.exports = new PublisherController;