const router = require('express').Router();
const { blogController } = require('../controllers');
const { userAuthenticate, blogValidator, Validate }  = require('../middleware/validator.js')

router.post('/', userAuthenticate, blogValidator, Validate,  blogController.addBlog)
router.get('/', userAuthenticate, blogController.getAllBlog)
router.get('/:id', blogController.getOneBlog)
router.put('/:id', userAuthenticate, blogValidator, Validate, blogController.updateBlog)
router.delete('/:id', userAuthenticate, blogController.deleteBlog)

module.exports = router