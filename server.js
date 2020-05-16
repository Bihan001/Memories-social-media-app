const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const PORT = process.env.PORT || 5000;

//MiddleWare
app.use(express.json());
app.use(cors());

//Database connection
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log('Database Connection Successful');
  })
  .catch((err) => {
    console.log('Database not connected ' + err);
  });

//ROUTES
app.use('/api/users', require('./routes/api/users/CreateUser'));
app.use('/api/users/edit', require('./routes/api/users/UpdateUser'));
app.use('/api/auth', require('./routes/api/users/AuthUser'));
app.use('/api/users/delete', require('./routes/api/users/DeleteUser'));
app.use('/api/upload-profile-pic', require('./routes/api/files/UploadProfilePic'));
app.use('/api/users/update-follow', require('./routes/api/users/UpdateFollowers'));
app.use('/api/post', require('./routes/api/posts/Posts'));
app.use('/api/post/new', require('./routes/api/posts/CreatePost'));
app.use('/api/post/delete', require('./routes/api/posts/DeletePost'));
app.use('/api/post/update-like', require('./routes/api/posts/updateLikes'));
app.use('/api/post/comment', require('./routes/api/posts/Comments'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//LISTEN ON GIVEN PORT
server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});
