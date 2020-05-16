const express = require('express');
const router = express.Router();
const User = require('../../../Models/UserSchema');
const auth = require('../../../Middlewares/Auth');

router.delete('/', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ msg: 'Account Deleted' });
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

module.exports = router;
