const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  postMedia: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  postText: {
    type: String,
  },
  likes: [
    {
      user: {
        type: String,
      },
    },
  ],
  comments: [
    {
      user: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', postSchema);
