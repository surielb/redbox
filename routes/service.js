import {state} from '../modules/data';
import {licenses} from '../modules/licenses'



module.exports = (app)=>{
    app.get('/status', (req, res)=> {
        state.findOne().exec().then(s=>{
            res.json(s);
        }).catch(e=>{
            res.status(400).json({error:e});
        });

    });

    app.get('/license/:number',(req,res)=>{
        const l = licenses[req.params.number];
        if(l){
            res.json(l);
        }else{
            res.status(404).json({error:'not found'});
        }
    });

    app.put('/status/:state',(req,res)=>{
        state.findOneAndUpdate({},{state:'0'!==req.params.state},{upsert:true}).exec().then(s=>{
            res.json(s);
        }).catch(e=>{
            res.status(400).json({error:e});
        });
    });

};