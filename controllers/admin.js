const {validationResult} = require('express-validator');
const Post = require('../models/post');

exports.getCreatePage = (req, res, next) =>{
    res.render('admin/create', {
        pageTitle: 'Create Blog Page',
        path: '/admin/create',
        editing: false
    });
};

//getAddPost

//postAddPost
exports.postAddPost = (req, res, next) => {
  const title = req.body.title;
  const postContent = req.body.create[0];
  const post = new Post({
    title: title,
    postContent: postContent,
    userId: req.user,
    postDate: new Date(),
  });
  post
    .save()
    .then(result => {
      console.log('created post');
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditPost = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const postId = req.params.postId;
  console.log(postId)
  Post.findById(postId)
    .then(post => {
      if (!post) {
        return res.redirect('/');
      }
      res.render('admin/create', {
        pageTitle: 'Edit Post',
        path: '/admin/create',
        editing: editMode,
        post: post
      });
    })
    .catch(err => console.log(err));
};

exports.postEditPost = (req, res, next) => {
  console.log('In post edit post');
  const postId = req.body.postId;
  const updatedTitle = req.body.title;
  const updatedPostContent = req.body.create[0];

  Post.findById(postId)
    .then(post => {
	    post.title = updatedTitle;
	    post.postContent = updatedPostContent;
	    return post.save();
	})
	.then(result => {
	  console.log('Updated Post!');
	  res.redirect('/');
	})
	.catch(err => console.log(err));

  // res.redirect('/admin/create');
}



//getPosts

exports.postDeletePost = (req, res, next) => {
  console.log('made it to the delete post')
  const postId = req.body.postId;
  console.log(postId)
  Post.findByIdAndRemove(postId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/');
    })
    .catch(err => console.log(err));
};