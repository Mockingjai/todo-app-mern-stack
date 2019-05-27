const express = require('express');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const router = express.Router();

const _Events = require('../models/Events');
const auth = require('../middleware/auth');


// @    Method GET me/events/all
// @    Show all of the events
// @    Public
router.get('/show', auth ,async (req, res, next) => {
    //Adding id of the user to the request to get his/her events
    const owner = req.header('owner');
    const events = await _Events.find({owner:owner}).limit(20).skip(1).sort({date: -1});
    res.status(200).json({ events });
});
// @    Method GET me/events/show:id
// @    Show event by id
// @    Public
router.get('list/:id', auth ,async (req, res, next) => {
    //Getting id of event from request
    let id = _Events.findById(id, (err, event) => {
        if(!event) {
            console.log('No events avaible')
        }
        console.log(event);
        res.status(200).json({ event });
    })
});

// @    Method POST me/events/create
// @    Creating new event
// @    Public
router.post('/create', auth , [
    //Validating form
    check('name').not().isEmpty(),
    check('date').not().isEmpty(),
], async (req, res) => {
    const { name, date, owner } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(401).json({errors: errors.array()})
    }
    let event = new _Events(req.body);
    await event.save();
    res.status(201).json({ event });

});
// @    Method PUT me/events/edit
// @    Deleting event
// @    Public
router.put('/edit/:id', auth, async (req, res, next) => {
    await _Events.findById(req.params.id, async (error, events) => {
        if(!events) {
            return next(new Error("Event didn't exist"));
        } else {
        //Get new data for event to update
        events.name = req.body.name;
        events.date = req.body.date;
    }
        await events.save();
        res.json('todo updated');
    });
});

// @    Method DELETE me/events/delete/:id
// @    Deleting event
// @    Public
router.delete('/delete/:id', auth ,async (req, res, next) => {
    const id = req.params;
    const del = await _Events.findByIdAndDelete(id, function (err, event) {
        if (err) {
            return next(new Error('Todo was not found'));
        }
        return event;
    })
    res.json({ del })
});

module.exports = router;