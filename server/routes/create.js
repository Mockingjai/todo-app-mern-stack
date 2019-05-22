const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const _Events = require('../models/Events');

router.post('/', auth, async (req, res) => {
    try {
        let event = new _Events({
            name: req.body.name,
            date: req.body.email,
            owner: req.body.owner,
        });
        await event.save();
        res.status(201).json(event);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;