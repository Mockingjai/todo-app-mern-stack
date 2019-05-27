const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    }
});

module.exports = User = mongoose.model('users', UserSchema);