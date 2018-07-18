const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const fs = require('fs');
const path = require('path');
const dbConfigPath = path.join(__dirname, './prediction.json');
const predictions = JSON.parse(fs.readFileSync(dbConfigPath, 'utf8'));

export const predict = (date)=>{
    let pred = null;
    for(let i=0;i<predictions.length;i++){
        if(new Date(predictions[i].date) < date)
            pred = predictions[i];
        else
            break;
    }
    return pred;
}

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
            const p = predict(new Date());
            //{next: parseInt(Math.random() * 3 * 60 * 60  ),for:parseInt(Math.random() *60 *60)}
            success(Object.assign(s||{},p));
        }).catch(error);
    }) ;
};
