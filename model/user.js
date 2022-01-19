const mongoose = require('mongoose');
let timestamps = require('mongoose-timestamp');

let modelSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    mobile: {
        type: Number
    },
    otp: {
        type: Number
    },
    otpverified: {
        type: Boolean,
        default: false
    },
    isdeleted: {
        type: Number,
        default: 0
    }
})

modelSchema.plugin(timestamps);

let user = new mongoose.model('user', modelSchema);

module.exports = user;