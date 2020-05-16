//Signup
const express = require('express');
const router = express.Router();
const User = require('../../../Models/UserSchema');
const auth = require('../../../Middlewares/Auth');
const { check, validationResult } = require('express-validator');

//USER REGISTRATION
//METHOD - POST
//aCCESS - PUBLIC
router.put(
  '/',
  [check('firstName', 'Enter first name').not().isEmpty(), check('lastName', 'Enter last name').not().isEmpty()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(412).json({ errors: errors.array() });
    }
    try {
      const { firstName, lastName, dob, gender, bio, phone, address, country } = req.body;
      const fullName = firstName + ' ' + lastName;

      const newUser = {
        firstName,
        lastName,
        fullName,
        dob,
        gender,
        bio,
        phone,
        address,
        country,
      };
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: newUser },
        { new: true, useFindAndModify: false }
      );
      return res.status(200).send(updatedUser);
    } catch (err) {
      return res.status(402).json({ errors: [{ msg: err.message }] });
    }
  }
);

module.exports = router;
