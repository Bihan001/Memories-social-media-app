const express = require('express');
const router = express.Router();
const User = require('../../../Models/UserSchema');
const auth = require('../../../Middlewares/Auth');

router.put('/', auth, async (req, res) => {
  try {
    const { user_userName, profile_userName } = req.body;
    if (user_userName === profile_userName) {
      return res.status(402).json({ errors: [{ msg: 'Cannnot follow yourself' }] });
    }
    const user = await User.findOne({ userName: user_userName });
    const profile = await User.findOne({ userName: profile_userName });
    if (profile.followers.length > 0 && profile.followers.find((profile) => profile.user === user.userName)) {
      profile.followers = profile.followers.filter((profile) => profile.user !== user.userName); //Unfollow
      user.following = user.following.filter((prof) => prof.user !== profile.userName);
    } else {
      profile.followers.unshift({ user: user.userName }); //Follow
      user.following.unshift({ user: profile.userName });
    }
    await user.save();
    await profile.save();
    return res.status(200).json({ profile, user });
  } catch (err) {
    console.log(err.message);
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
