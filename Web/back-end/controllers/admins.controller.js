const express = require('express');
const admins = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admins.model');
process.env.SECRET_KEY = 'secret';
admins.use(cors());
exports.login = (req, res) => {   // Login que verifica que el email sea unico en la base de datos, 
    Admin.findOne({               // compara la contraseña encriptada y envia un token para controlk
            email: req.body.email
        })
        .then(admin => {
            if (admin) {
                if (bcrypt.compareSync(req.body.password, admin.password)) {
                    const payload = {
                        _id: admin._id,
                        email: admin.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ error: 'El admin no existe' })
                }
            } else {
                res.json({ error: 'El admin no existe' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}