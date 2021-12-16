const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin')
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/create', isAuth, adminController.getCreatePage);
router.post('/create-post', isAuth, adminController.postAddPost);
router.get('/edit-post/:postId', isAuth, adminController.getEditPost);
router.post('/edit-post', isAuth, adminController.postEditPost);
router.post('/delete-post', isAuth, adminController.postDeletePost);


// router.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname,'..', 'views', 'home.html'));
// });

module.exports = router;