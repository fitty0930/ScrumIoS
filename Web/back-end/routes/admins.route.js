const express = require('express');
const admins = express.Router();
const { login } = require('../controllers/admins.controller'); // Rutas 
admins.post('/login', login);
module.exports = admins;