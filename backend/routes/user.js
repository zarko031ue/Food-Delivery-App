const express = require('express');

const UserController = require('../controlers/user')

const router = express.Router();

router.post("/singup", UserController.createUser);

router.post("/login", UserController.loginUser);

module.exports = router;