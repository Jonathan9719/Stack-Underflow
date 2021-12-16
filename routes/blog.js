const path = require('path');

const express = require('express');

const blogController = require('../controllers/blog')
const adminController = require('../controllers/admin')
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', blogController.getIndex);
router.get('/profile', isAuth, blogController.getProfilePage);


module.exports = router;