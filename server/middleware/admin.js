const express = require('express');
const User = require('../models/User');

const admin = (req, res, next) => {
    User.findById(req.body.role, (err, ress) => {
        if(!req.body.role) {
            res.status(401).send("You don't have roots");
        }
        if(req.body.role === 'admin') {
            
        }
    });
};
module.exports = admin;