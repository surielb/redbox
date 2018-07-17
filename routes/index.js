const express = require('express');
const router = express.Router();
import {state} from '../modules/data';


const formatTime =(seconds)=>{
    let when = '';

    if(seconds > 3600 )
    {
        const hours = parseInt(seconds / 3600);
        when = `${hours} hour${hours > 1?'s':''}`
        seconds -= hours *3600
    }

    if(seconds > 60 ){
        const  minutes = parseInt(seconds /60);
        if(when.length > 0)
            when += ' and ';
            when +=`${minutes} minute${minutes>1?'s':''}`
    }
    return when ;
};
/* GET home page. */
router.get('/', function (req, res) {
    state.fetch().then(s=>{
       const when = formatTime(s.next +100);
        const  time = formatTime(s.for +100);
        res.render('index', { title: 'IsTheParkingOpen.com',state:s.state || false,when,time});
    });

});

module.exports = router;
