const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const config = require('config');
const _Events = require('../models/Events');


//Delete event by id provided in URL
router.delete('/:id', auth ,async (req, res, next) => {
    let events = _Events.findByIdAndDelete(req.params.id, (err, ress) => {
        if(!ress) {
            res.send('Event not found or already deleted')
        }
        res.status(200).send(ress);
    });
    await events.save();
    res.status(200).send('Deleted');
});

module.exports = router;