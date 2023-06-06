const express = require('express');
const {login, register, checkSession} = require('../controllers/users.controllers');
const { isAuth } = require('../../middlewares/auth');
const usersRoutes = express.Router();

usersRoutes.post('/login', login)
usersRoutes.post('/register', register);
usersRoutes.get('/checksession', isAuth, checkSession);

module.exports = usersRoutes;