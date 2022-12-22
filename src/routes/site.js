const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/siteController');

router.get('/error404', siteController.error404);
router.get('/', siteController.index);

module.exports = router;