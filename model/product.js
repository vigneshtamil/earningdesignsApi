const mongoose = require('mongoose');
let timestamps = require('mongoose-timestamp');

let modelSchema = new mongoose.Schema({
    imageTitle: {
        type: String
    },
    imageDiscription: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    itemforSale: {
        type: String
    },
    itemPrice: {
        type: String
    },
    accept: {
        type: Boolean
    },
    isdeleted: {
        type: Number,
        default: 0
    },

})

modelSchema.plugin(timestamps);

let product = new mongoose.model('product', modelSchema);

module.exports = product;