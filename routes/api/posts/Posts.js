const express = require('express');
const router = express.Router();
const auth = require('../../../Middlewares/Auth');
const Post = require('../../../Models/PostSchema');
const User = require('../../../Models/UserSchema');

router.get('/all', auth, async (req, res) => {
  try {
    var posts = await Post.find();
    const user = await User.findById(req.user.id);
    posts = posts.filter(
      (post) => user.following.find((profile) => profile.user === post.user) || post.user === user.userName
    );
    posts = posts.reverse();
    res.status(200).json(posts);
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

router.get('/user/:userName', auth, async (req, res) => {
  try {
    const { userName } = req.params;
    var posts = await Post.find();
    posts = posts.filter((post) => post.user === userName);
    posts = posts.reverse();
    res.status(200).json(posts);
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

router.get('/:postid', auth, async (req, res) => {
  try {
    const { postid } = req.params;
    const post = await Post.findById(postid);
    res.status(200).json(post);
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
