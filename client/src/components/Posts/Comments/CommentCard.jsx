import React from 'react';
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../../actions/post';
import PropTypes from 'prop-types';
import Spinner from '../../layouts/spinner';

const CommentCard = ({ auth: { user, profiles, loading }, post, comment, deleteComment }) => {
  var fUser = null;
  const findUser = () => {
    if (fUser === null) {
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
          findUser().profilePicLink
            ? findUser().profilePicLink.url
            : 'https://www.linuxtrainingacademy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
        }
        alt=""
        className="profile-photo-sm"
      />
      <p>
        <Link to={`/profile/${findUser().userName}`} className="profile-link">
          {findUser().fullName}
        </Link>{' '}
        {comment.text}{' '}
      </p>
      {comment.user === user.userName ? (
        <Link
          className="text-red ml-2 mt-1"
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

export default connect(mapStateToProps, { deleteComment })(CommentCard);
