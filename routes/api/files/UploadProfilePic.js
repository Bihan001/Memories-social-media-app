const express = require('express');
const User = require('../../../Models/UserSchema');
const auth = require('../../../Middlewares/Auth');
const upload = require('./Multer');
const cloudinary = require('cloudinary');
require('./Cloudinary');
const fs = require('fs');

const router = express.Router();

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: 'image',
      public_id: `images/${req.user.id}/${req.file.filename}`,
    });
    fs.unlinkSync(req.file.path);
    const imgSet = {
      profilePicLink: {
        public_id: result.public_id,
        url: result.url,
      },
    };
    const user = await User.findByIdAndUpdate(req.user.id, { $set: imgSet }, { new: true, useFindAndModify: false });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

module.exports = router;
