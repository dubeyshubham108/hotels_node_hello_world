const express =require('express');
const router = express.Router();
const Person = require('./../models/person');


router.get('/:workType', async (req, res) => {
    try {
      const workType = req.params.workType; // Extract the work type from URL
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
      } else {
        res.status(404).json({error: 'Invalid work type'});
      }
    } catch {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
  });

  router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for a person
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true,
        })

        if(!response) {
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    } catch {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter

        // Assuming you have a Person model
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data delete');
        res.status(200).json({ message: 'Person Deleted Successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



  module.exports = router