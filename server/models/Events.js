const mongoose = require('mongoose');
const Schema = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'owner'
    },
});
EventSchema.plugin(mongoosePaginate);

module.exports = EventCreate = mongoose.model('events', EventSchema);