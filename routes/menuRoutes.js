const express =require('express');
const router = express.Router();
const menuItem = require('./../models/menuItem');

router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new menuItem(menu);
      const response = await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })
  
  // GET method to get the menu response
  router.get('/', async (req, res) => {
    try {
      const data = await menuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    } catch(err) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })

  module.exports = router;