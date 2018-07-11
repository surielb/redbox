const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
export const state = mongoose.model("State",new Schema({
    state:Boolean,
    updated: {
        type: Date,
        'default': Date.now,
        index: true
    }
}));
