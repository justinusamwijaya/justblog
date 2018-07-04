const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const staticRoutes = require('./staticRoutes');

router.use('/', staticRoutes)
router.use('/blogs',blogRoutes)

module.exports = router