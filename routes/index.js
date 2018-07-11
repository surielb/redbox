const express = require('express');
const router = express.Router();
import {state} from '../modules/data';



/* GET home page. */
router.get('/', function (req, res) {
    state.findOne().exec().then(s=>{
        res.render('index', { title: 'Red Box',state:s.state || false});
    });

});

module.exports = router;
