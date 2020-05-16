const express = require('express');
const router = express.Router();
const auth = require('../../../Middlewares/Auth');
const Post = require('../../../Models/PostSchema');
const User = require('../../../Models/UserSchema');

router.get('/all/:postid', auth, async (req, res) => {
  try {
    const { postid } = req.params;
    const post = Post.findById(postid);
    res.status(200).json(post.comments);
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

router.put('/add', auth, async (req, res) => {
  try {
    const { postid, text } = req.body;
    const user = await User.findById(req.user.id);
    const post = await Post.findById(postid);
    post.comments.unshift({
      user: user.userName,
      text,
    });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

router.delete('/delete/:postid/:commentid', auth, async (req, res) => {
  try {
    const { postid, commentid } = req.params;
    const post = await Post.findById(postid);
    post.comments = post.comments.filter((comment) => comment._id != commentid);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
