import React, { useState } from 'react';
import { MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPost } from '../../actions/post';

import UserImg from "../../images/userimg.png";


const PostCreateBox = ({
  auth: { user, isAuthenticated },
  fileUploads: {
    request: { uploadRequest: request },
  },
  createPost,
}) => {
  const [file, setFile] = useState('');
  const [text, setText] = useState('');

  const changeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeText = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('postText', text);
    !request && createPost(formData, user && user.userName);
  };
  return (
    <div className="create-post pt-0">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row ">
          <div className="col-md-7 col-sm-7">
            <div className="form-group">
              <img
                src={
                  user && user.profilePicLink
                    ? user.profilePicLink.url
                    : UserImg
                }
                alt=""
                className="profile-photo-md"
              />
              <textarea
                name="texts"
                id="exampleTextarea"
                cols="300"
                rows="1"
                className="form-control"
                placeholder="Write a post"
                value={text}
                onChange={(e) => changeText(e)}
              ></textarea>
            </div>
          </div>
          <div className="col-md-5 col-7">
            <div className="d-flex align-items-center" style={{ marginTop: '18px' }}>
              <span className="px-1 px-md-3 pl-5 pl-md-0 imgBtn" style={{ fontSize: '25px' }}>
                <MDBIcon icon={file ? 'check' : 'image'} />
                <input type="file" onChange={(e) => changeFile(e)} />
              </span>
              <button className="btn btn-primary pull-right btn-sm" disabled={request && !isAuthenticated}>
                Publish
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
PostCreateBox.propTypes = {
  auth: PropTypes.object.isRequired,
  fileUploads: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  fileUploads: state.fileUploads,
});

export default connect(mapStateToProps, { createPost })(PostCreateBox);
