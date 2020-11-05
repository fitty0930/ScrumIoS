const express = require('express');
const users_wait = express.Router();
const cors = require('cors');
const User_wait = require('../models/users_wait.model');
const bcrypt = require('bcrypt');
users_wait.use(cors());

exports.getUsers = (req, res) => {

    User_wait.find().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(404).json('Error en la base de datos : ' + err);
    })
}
exports.Register_user = (req, res) => {
    const userData = {
        age: req.body.age,
        city: req.body.city,
        country: req.body.country,
        gameTasteLevel: req.body.gameTasteLevel,
        gameTimeLevel: req.body.gameTimeLevel,
        gender: req.body.gender,
        mail: req.body.mail,
        name: req.body.name,
        profession: req.body.profession,
        state: req.body.state,
        password: req.body.password,
    }
    User_wait.findOne({
            mail: req.body.mail
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    User_wait.create(userData)
                        .then(user => {
                            res.json({ status: user.mail + ' se ha generado la peticion' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'Ya hay un usuario pendiente con ese mail' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}
exports.darAlta = (req, res) => {

    User_wait.findOneAndDelete({
        mail: req.body.mail
    }).then(response => {
        res.send(response.mail + ": Se borro con exito");
    }).catch(err => {
        res.status(404).json({ error: err });
    })
}