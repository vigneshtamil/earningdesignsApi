const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.')

        } else {
            console.log('Error in DB connection : ' + err)
        }
    });

require('../model/index');
