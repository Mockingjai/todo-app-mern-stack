const express = require('express');
const router = express.Router();
const _Events = require('../models/Events');
const auth = require('../middleware/auth');

router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    await _Events.findById(id, (err, event) => {
       res.json({ event });
    });
});

router.get('/', auth, async (req, res) => {
   await _Events.find({owner: req.header('owner')}, (err, events) => {
       if(err) {
           res.status(401).send('Error in get endpoint');
       }
       res.json(events)
   });
   //.limit(20).skip(1).sort({date: -1});
});

module.exports = router;