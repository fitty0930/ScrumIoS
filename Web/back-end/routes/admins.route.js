const express = require('express');
const admins = express.Router();
const { login } = require('../controllers/admins.controller');
admins.post('/login', login);
module.exports = admins;