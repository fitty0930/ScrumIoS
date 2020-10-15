const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({ // El esquema que usa la colleccion de admins
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = Admin = mongoose.model('admins', adminSchema);