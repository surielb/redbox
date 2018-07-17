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
state.fetch =  ()=>{
    return new Promise((success,error)=>{
        state.findOne().exec().then(s=>{
            success(Object.assign(s||{},{next: parseInt(Math.random() * 3 * 60 * 60  ),for:parseInt(Math.random() *60 *60)}));
        }).catch(error);
    }) ;
};
