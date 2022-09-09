const { Op } = require('sequelize');
const StateModel = require('../models/State');

class StateController {
  
  index = async (req, res, next) => {
    res.json(await StateModel.findAll());
  }

  create = async (req,res,next) => {
    try {
        const data = await this.validateData(req.body);
        const user = await StateModel.create(data);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

  show = async (req,res,next) => {
    const user = await StateModel.findByPk(req.params.stateId);
res.json(user);
}

update = async (req,res,next) => {
try {
    const id = req.params.stateId;
    const data = await this.validateData(req.body, id);
    await StateModel.update(data, {
      where: {
        id:id
      }
    });
    res.json(await StateModel.findByPk(id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

delete = async (req,res,next) => {
  await StateModel.destroy({
    where: {
      id: req.params.stateId
    }
  });
  res.json({});
  }
  

validateData = async (data, id) => {
  const attributes = ['name','province'];
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

module.exports = new StateController;