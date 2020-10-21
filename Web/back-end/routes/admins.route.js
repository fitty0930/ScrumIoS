const express = require('express');
const admins = express.Router();
const { login, register } = require('../controllers/admins.controller');
admins.post('/login', login);
admins.post('/register', register);
module.exports = admins;