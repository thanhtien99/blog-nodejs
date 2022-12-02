const express = require('express');
const router = express.Router();
const multer  = require('multer');
const usersController = require('../app/controllers/usersController');


const upload = multer({ dest: './src/media/uploads/' })

router.get('/login', usersController.login);
router.post('/login', usersController.loginPost);
router.get('/register', usersController.register);
router.post('/create', usersController.create);
router.get('/logout', usersController.logout);
router.get('/', usersController.index);

module.exports = router;