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
            let p = predict(new Date());
            if((!!p.value) !== (!!s.state)&& p.next <= 5 )
            {

                //try again
                const sec = predict(new Date(Date.now()+ 1000 * 1000 * 60 * p.next) );
                if((!!sec.value )===(!!s.state)) {
                    p = Object.assign({},sec,{next:sec.next + p.next});
                }

            }

            //{next: parseInt(Math.random() * 3 * 60 * 60  ),for:parseInt(Math.random() *60 *60)}
            success(Object.assign(s||{},p));
        }).catch(error);
    }) ;
};
