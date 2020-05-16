const express = require('express');
const router = express.Router();
const auth = require('../../../Middlewares/Auth');
const User = require('../../../Models/UserSchema');
const Post = require('../../../Models/PostSchema');
const upload = require('../files/Multer');
const cloudinary = require('cloudinary');
require('../files/Cloudinary');
const fs = require('fs');

router.post('/', auth, upload.single('image'), async (req, res) => {
  const { postText } = req.body;
  try {
    var result = null;
    if (req.file) {
      result = await cloudinary.v2.uploader.upload(req.file.path, {
        resource_type: 'image',
        public_id: `images/${req.user.id}/${req.file.filename}`,
      });
      fs.unlinkSync(req.file.path);
    }
    const user = await User.findById(req.user.id);
    if (!postText && !result) {
      return res.status(401).json({ errors: [{ msg: 'Either add an image or some text' }] });
    }
    const newPost = new Post({
      user: user.userName,
      postText: postText ? postText : null,
      postMedia: result !== null ? { public_id: result.public_id, url: result.url } : null,
    });
    await newPost.save();
    user.posts.unshift({ postID: newPost._id });
    await user.save();
    res.status(200).json(newPost);
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
