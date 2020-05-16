//Login
const express = require('express');
const router = express.Router();
const auth = require('../../../Middlewares/Auth');
const User = require('../../../Models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { check, validationResult } = require('express-validator');

//VIEW LOGGED IN USER'S DETAILS except password
//METHOD - GET
//Access - PRIVATE
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

router.get('/profile/:userName', auth, async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName }).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(403).json({ errors: [{ msg: err.message }] });
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    var users = await User.find().select('-password');
    //users = users.filter((user) => user._id != req.user.id);
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(402).json({ errors: [{ msg: err.message }] });
  }
});

//LOG IN
//METHOD - POST
//Access - PUBLIC
router.post(
  '/',
  [check('email', 'Enter a valid email').isEmail(), check('password', 'Enter a password').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() });
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Email' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(402).json({ errors: [{ msg: 'Invalid Password' }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_TOKEN,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token: token });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(403).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
