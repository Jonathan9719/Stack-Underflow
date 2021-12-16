const Post = require('../models/post');

exports.getIndex = (req, res, next) =>{
    Post.find()
        .then(post => {
            console.log(post);
            res.render('blog/index', {
                posts: post,
                pageTitle: 'Home',
                path: '/'
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
};

exports.getProfilePage = (req, res, next) =>{
    Post.find({ userId: req.user._id })
    .then(post => {
        console.log(post)
        res.render('blog/profile', {
            posts: post,
            pageTitle: 'Profile Page',
            path: '/profile'
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
};
