import React, { useState } from 'react';
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import PropTypes from 'prop-types';

import UserImg from "../../images/userimg.png";


const NewComment = ({ auth: { user }, addComment, post }) => {
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };
  const handleAddComment = () => {
    addComment({ postid: post._id, text }, post.user);
    setText('');
  };
  return (
    <div className="post-comment align-items-center">
      <img
        src={
          user && user.profilePicLink
            ? user.profilePicLink.url
            : UserImg
        }
        alt=""
        className="profile-photo-sm"
      />
      <input
        type="text"
        className="form-control"
        placeholder="New comment"
        value={text}
        onChange={(e) => onChange(e)}
      />
      <Link className="ml-3" style={{ fontSize: '17px' }} onClick={() => handleAddComment()}>
        <MDBIcon icon="paper-plane" />
      </Link>
    </div>
  );
};

NewComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addComment })(NewComment);
