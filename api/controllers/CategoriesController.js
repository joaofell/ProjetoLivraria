const { Op } = require('sequelize');
const CategoryModel = require('../models/Category');

class CategoryController {
  
    index = async (req, res, next) => {
        res.json(await CategoryModel.findAll());
      }
    

  create = async (req,res,next) => {
    try {
        const data = await this.validateData(req.body);
        console.log(data.name)

        const user = await CategoryModel.create(data);

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

  show = async (req,res,next) => {
    const user = await CategoryModel.findByPk(req.params.cityId);
res.json(user);
}
  
update = async (req,res,next) => {
    try {
        const id = req.params.categoryId;
        const data = await this.validateData(req.body, id);
        await CategoryModel.update(data, {
          where: {
            id:id
          }
        });
        res.json(await CategoryModel.findByPk(id));
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
    
    delete = async (req,res,next) => {
      await CategoryModel.destroy({
        where: {
          id: req.params.categoryId
        }
      });
      res.json({});
      }
      
    

validateData = async (data, id) => {
    const attributes = ['description'];
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
module.exports = new CategoryController;