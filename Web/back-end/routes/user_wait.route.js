const express = require('express');
const user_wait = express.Router();
const { getUsers, Register_user, darAlta } = require('../controllers/users_wait.controller');
user_wait.get('/', getUsers);
user_wait.post('/', Register_user);
user_wait.delete('/', darAlta)
module.exports = user_wait;