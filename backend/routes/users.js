const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
router.post('/', UserController.create);
module.exports = router;