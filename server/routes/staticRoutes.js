const router = require('express').Router();
const { staticController } = require('../controllers')
const { userValidator, Validate } = require('../middleware/validator.js')

router.post('/login', staticController.login)
router.post('/signup',userValidator,Validate, staticController.signup)

module.exports = router