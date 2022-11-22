const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/siteController');

// router.use('/:slug', blogsController.show);
router.get('/', siteController.index);

module.exports = router;