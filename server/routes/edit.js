const express = require('express');
const router = express.Router();

const _Events = require('../models/Events');
const auth = require('../middleware/auth');

//  @TYPE PUT        /edit
//  @DESCRIPTION     edit todo
//  @ACCESS          Public
router.post('/:id', auth ,async (req, res) => {
    console.log(req.params)
   _Events.findById(req.params.id, async (err, event) => {
       console.log(event)
        if(!event) {
            res.send(404).send('Event not found');
        }
        event.name = req.body.name;
        event.date = req.body.date;
        await event.save();
        // res.json({ event });
        res.send(event);
   });
});

module.exports = router;