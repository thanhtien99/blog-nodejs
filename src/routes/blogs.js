const express = require('express');
const router = express.Router();
const multer  = require('multer');
const blogsController = require('../app/controllers/blogsController');

const upload = multer({ dest: './src/media/uploads/' })

router.get('/create', blogsController.create);
router.post('/store', upload.single('image'), blogsController.store);
router.get('/datail', blogsController.datail);
router.get('/edit/:id', blogsController.edit);
router.post('/update/:id', upload.single('image'), blogsController.update);
router.delete('/delete/:id', blogsController.delete);
router.get('/', blogsController.index);

module.exports = router;