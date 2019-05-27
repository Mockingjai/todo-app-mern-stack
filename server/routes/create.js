const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const _Events = require('../models/Events');

router.post('/', [
    check('name').isLength({min: 1}),
    check('date').isLength({min: 10, max: 10}),
] , auth ,async (req, res) => {
    const { name, email } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).send(errors);
    } else {
        try {
            let event = new _Events({
                name: name,
                date: email,
                owner: req.body.owner,
            });
            await event.save();
            res.status(201).json({ event });
        } catch (e) {
            console.log(e.message);
            res.status(500).send('Server Error');
        }
    }
    
});

module.exports = router;