const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicLink: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  state: {
    type: String,
    default: 'offline',
  },
  dob: {
    type: String, //TO BE CHANGED
  },
  gender: {
    type: String,
  },
  bio: {
    type: String,
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  following: [
    {
      user: {
        type: String,
      },
    },
  ],
  followers: [
    {
      user: {
        type: String,
      },
    },
  ],
  posts: [
    {
      postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
      },
    },
  ],
});

user = mongoose.model('User', userSchema);
module.exports = user;
