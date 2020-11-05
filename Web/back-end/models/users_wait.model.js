const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user_waitSchema = new Schema({
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    gameTasteLevel: {
        type: String,
        required: true
    },
    gameTimeLevel: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = User_wait = mongoose.model("users_wait", user_waitSchema);