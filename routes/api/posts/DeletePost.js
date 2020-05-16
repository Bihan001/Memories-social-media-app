const express = require('express');
const router = express.Router();
const Post = require('../../../Models/PostSchema');
const User = require('../../../Models/UserSchema');
const auth = require('../../../Middlewares/Auth');

router.delete('/:postid', auth, async (req, res) => {
  const { postid } = req.params;
  try {
    await Post.findByIdAndDelete(postid);
    const user = await User.findById(req.user.id);
    user.posts = user.posts.filter((post) => post.postID != postid);
    await user.save();
    res.status(200).json({ msg: 'Post Deleted' });
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
