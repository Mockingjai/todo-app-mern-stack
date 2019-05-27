const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const _Events = require('../models/Events');
const auth = require('../middleware/auth');

//  @TYPE PUT        /edit
//  @DESCRIPTION     edit todo by id which provided in URL
//  @ACCESS          Public
router.put('/:id', [
    check('name').isLength({min: 1}),
    check('date').isLength({min: 10, max: 10})
] ,auth ,async (req, res) => {
    console.log(req.params);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).send('Errors occured');
    }
    await _Events.findById(req.params.id, async (err, events) => {
       console.log(events);
        if(!events) {
            res.send(404).send('Event not found');
        }
        events.name = req.body.name;
        events.date = req.body.date;
        events.completed = req.body.completed;
        await events.save();
        console.log(events);
        res.status(201).json({ events });
   });
});

module.exports = router;