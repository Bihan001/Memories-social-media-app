//Signup
const express = require('express');
const router = express.Router();
const User = require('../../../Models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { check, validationResult } = require('express-validator');

//USER REGISTRATION
//METHOD - POST
//aCCESS - PUBLIC
router.post(
  '/',
  [
    check('firstName', 'Enter first name').not().isEmpty(),
    check('lastName', 'Enter last name').not().isEmpty(),
    check('userName', 'Enter an username').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Enter a password').not().isEmpty(),
    check('password', 'Minimum passowrd length should be 8').isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(412).json({ errors: errors.array() });
    }
    try {
      const { firstName, lastName, email, password, userName } = req.body;
      const fullName = firstName + ' ' + lastName;

      var user = await User.findOne({ email });
      if (user) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Email already exists' }] });
      }
      user = await User.findOne({ userName });
      if (user) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Username already taken' }] });
      }
      newUser = new User({
        firstName,
        lastName,
        fullName,
        userName,
        email,
        password,
      });

      const saltRounds = await bcrypt.genSalt(16);
      newUser.password = await bcrypt.hash(password, saltRounds);
      await newUser.save();
      const payload = {
        user: {
          id: newUser.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_TOKEN,
        {
          expiresIn: '8760h',
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token: token });
        }
      );
    } catch (err) {
      return res.status(402).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
