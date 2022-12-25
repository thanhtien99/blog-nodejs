const express = require('express');
const router = express.Router();
const multer  = require('multer');
const blogsController = require('../app/controllers/blogsController');
const middleware = require('../middleware/userValidate');
const upload = multer({ dest: './src/media/uploads/' })

router.get('/create', middleware.requiresLogin, blogsController.create);
router.post('/store', upload.single('image'), blogsController.store);
router.get('/datail', blogsController.detail);
router.get('/edit/:id', middleware.requiresLogin, blogsController.edit);
router.post('/update/:id', upload.single('image'), blogsController.update);
router.delete('/delete/:id', blogsController.delete);
router.put('/like/:id', blogsController.like);
router.put('/unlike/:id', blogsController.unlike);
router.post('/comment/:id', middleware.requiresLogin, blogsController.comments);
router.post('/replyCmt/:id', middleware.requiresLogin, blogsController.replyComments);
router.delete('/deleteCmt/:id', blogsController.deleteCmt);
router.get('/', middleware.requiresLogin, blogsController.index);

module.exports = router;