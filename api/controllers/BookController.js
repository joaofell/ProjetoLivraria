const { Op } = require('sequelize');
const BookModel = require('../models/Book');
const CategoryModel = require('../models/Category');
const PublisherModel = require('../models/Publisher');
const FormatModel = require('../models/format');

class BookController {
  index = async (req, res, next) => {

    const params = req.query;
    const limit = params.limit || 10;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const sort = params.sort || 'id'
    const order = params.order || 'ASC'
    const where = {};

    if (params.title) {
      where.title = {
        [Op.iLike]:`%${params.title}%`
      }
    }
    if (params.CategoryId) {
      where.CategoryId = {
        [Op.eq]:`${params.CategoryId}`
      }
    }

    const cities = await BookModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [ [sort,order] ],
      include: [{
        model: CategoryModel,
        required:false,
        attributes:['description']
    },
    {
        model: PublisherModel,
        required:false,
        attributes:['name'],     
    },
    {
      model: FormatModel,
      required:false,
      attributes:['description'],     
    }
      ]
    
    })

    res.json(cities)
  }

  create = async (req,res,next) => {
    try {
        const data = await this.validateData(req.body);
        console.log(data.name)

        const user = await BookModel.create(data);

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

  show = async (req,res,next) => {
    const user = await BookModel.findByPk(req.params.bookId);
res.json(user);
}
  
update = async (req,res,next) => {
    try {
        const id = req.params.bookId;
        const data = await this.validateData(req.body, id);
        await BookModel.update(data, {
          where: {
            id:id
          }
        });
        res.json(await BookModel.findByPk(id));
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
    
    delete = async (req,res,next) => {
      await BookModel.destroy({
        where: {
          id: req.params.bookId
        }
      });
      res.json({});
      }
      
    

validateData = async (data, id) => {
    const attributes = ['title','author','publication_year','pages','CategoryId','PublisherId','FormatId'];
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
module.exports = new BookController;