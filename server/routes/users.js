const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _crypt = require('../helpers/crypt-password');
const User = require('../models/User');
const _Events = require('../models/Events');

// @    Method POST /users/register
// @    Register new user
// @    Public
router.post('/register', [
    //Validating form
    check('email', 'Email field cannot be empty').isEmail(),
    check('password', 'Password cannot be empty').isLength({ min: 6 }),
] , async (req, res) => {
    const {email , password, role} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).send(errors);
    }
    try {
        // *Search user in db, if already exist throw an error
        await User.findOne({ email }, (err, user) => {
            if(user) {
                res.status(422).send('User already exist');
            }
        });
        //Creating new user
        let user = new User({
            email: email,
            password: password,
            salt: '',
        });
        //Crypt password with salt
        const hashed = await _crypt(password);
        user.password = hashed.password;
        user.salt = hashed.salt;
        //Add new user to db
        await user.save();
        res.status(200).json(user);
        res.redirect('/login');
    } catch (e) {
        console.log(`${e.message}`);
        res.status(500).send('Server error');
    }
});

router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({min: 6})
] , async (req, res) => {
    let user = User;
    const { email, password } = req.body;
    const errors = validationResult(req.body);
    if(!errors.isEmpty()) {
        res.status(401).send('Validation error');
    }
    try {
        const find = await User.findOne({ email });
        
        const payload = {
            user: {
                id: find._id
            }
        };
        //Giving jwt to user
        jwt.sign(payload,
            config.get("jwtSecret"),
           async (err, token) => {
                if(err) { throw err; }
                //Decrypt password and compare them
                 await bcrypt.compare(password, find.password, (err, result) => {
                   if(err) {
                       res.json(err);
                    }
                    //If passwords is equal give to the user token
                    console.log(token);
                    res.status(200).json({ token, find: find._id });
               });
            });
    } catch (e) {
        console.log(e.message);
    }
});

// @    Method GET /users/me
// @    Get access to account
// @    Public
router.get('/me', auth, async (req, res) => {
    try {
        //Get access to the home page of the user
        const user = await User.findById(req.user.id).select('-password').select('-salt');
        res.json({user: user});
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

router.post('/me/logout', auth, (req, res) => {
    res.status(201).send('Loged out');
});

module.exports = router;