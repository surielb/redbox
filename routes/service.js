import {state} from '../modules/data';




module.exports = (app)=>{
    app.get('/status', (req, res)=> {
        state.findOne().exec().then(s=>{
            res.json(s);
        }).catch(e=>{
            res.status(400).json({error:e});
        });

    });

    app.put('/status/:state',(req,res)=>{
        state.findOneAndUpdate({},{state:'0'!==req.params.state},{upsert:true}).exec().then(s=>{
            res.json(s);
        }).catch(e=>{
            res.status(400).json({error:e});
        });
    });

};