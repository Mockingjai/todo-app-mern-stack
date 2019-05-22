const express = require('express');
const router = express.Router();
const _Events = require('../models/Events');
const auth = require('../middleware/auth');

//Show element by id which provided as a param and belong to user id
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    await _Events.findById({onwer:req.header('owner')},id, (err, event) => {
       res.json({ event });
    });
});
//Show all events which belong to user id
router.get('/', auth, async (req, res) => {
   await _Events.find({owner: req.header('owner')}, (err, events) => {
       if(err) {
           res.status(401).send('Error in get endpoint');
       }
       res.json(events)
   });
});

module.exports = router;