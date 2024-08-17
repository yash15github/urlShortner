const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    shortId:{
        type : String,
        required: true,
        unique : true,
    },
    redirectUrl:{
        type : String,
        required: true,
    },
    visitHistory:[{ 
        timestamp:{type: Number}
    }],
}, {timestamps: true});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);
module.exports = ShortUrl;