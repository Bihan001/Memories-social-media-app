import React from 'react';
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import { getProfile } from '../../actions/auth';
import PropTypes from 'prop-types';
import Spinner from '../layouts/spinner';

import UserImg from "../../images/userimg.png";


const CommentCard = ({ auth: { user, profiles, loading }, post, comment, deleteComment, getProfile }) => {
  var fUser = null;
  const findUser = () => {
    if (!fUser) {
      fUser = profiles && profiles.find((profile) => profile.userName === comment.user);
    }
    return fUser;
  };
  return loading || !profiles ? (
    <Spinner />
  ) : (
    <div className="post-comment">
      <img
        src={
          findUser() && findUser().profilePicLink
            ? findUser().profilePicLink.url
            : UserImg
        }
        alt=""
        className="profile-photo-sm"
      />
      <p>
        <Link
          to={`/profile/${findUser() && findUser().userName}`}
          className="profile-link"
        >
          {findUser() && findUser().fullName}
        </Link>{' '}
        {comment.text}{' '}
      </p>
      {comment.user === user.userName ? (
        <Link
          className="text-red ml-2 mt-1"
          style={{ fontSize: '16px' }}
          onClick={() => deleteComment({ postid: post._id, commentid: comment._id }, post.user)}
        >
          <MDBIcon icon="trash-alt" />
        </Link>
      ) : null}
    </div>
  );
};

CommentCard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment, getProfile })(CommentCard);
