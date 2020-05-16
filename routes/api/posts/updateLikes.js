const express = require('express');
const router = express.Router();
const auth = require('../../../Middlewares/Auth');
const Post = require('../../../Models/PostSchema');
const User = require('../../../Models/UserSchema');

router.put('/:postid', auth, async (req, res) => {
  try {
    const { postid } = req.params;
    const post = await Post.findById(postid);
    const user = await User.findById(req.user.id);
    if (post.likes.length > 0 && post.likes.find((like) => like.user === user.userName)) {
      post.likes = post.likes.filter((like) => like.user !== user.userName);
    } else {
      post.likes.unshift({ user: user.userName });
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
