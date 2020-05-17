import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentCard from './Comments/CommentCard';
import NewComment from './Comments/NewComment';
import { updateLikes, deletePost } from '../../actions/post';
import Spinner from '../layouts/spinner';

const PostContent = ({ auth: { user, profiles, loading }, post, updateLikes, deletePost }) => {
  var fUser = null;
  const findUser = () => {
    if (fUser === null) {
      fUser = profiles && profiles.find((profile) => profile.userName === post.user);
    }
    return fUser;
  };
  return loading || !profiles ? (
    <Spinner />
  ) : (
    <div className="post-content">
      {post.postMedia ? <img src={post.postMedia.url} alt="" className="img-responsive post-image" /> : null}
      <div className="post-container d-flex">
        <img
          src={
            findUser() && findUser().profilePicLink
              ? findUser().profilePicLink.url
              : 'https://www.linuxtrainingacademy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
          }
          alt=""
          className="profile-photo-md pull-left"
        />
        <div className="post-detail ml-2 pl-3 mt-2">
          <div className="user-info">
            <h5>
              <Link to={`/profile/${post.user}`} className="profile-link">
                {findUser() && findUser().fullName}
              </Link>{' '}
              <span className="following">following</span>
            </h5>
            <p className="text-muted">{post.date.slice(0, 10)}</p>
          </div>
          <div className="reaction pt-3 pb-4" style={{ fontSize: '17px' }}>
            <Link
              className="text-green mx-3"
              style={{ color: post.likes.find((like) => like.user === user.userName) ? '#39b54a' : '#8dc63f' }}
              onClick={() => updateLikes(post._id, post.user)}
            >
              <MDBIcon icon="thumbs-up" /> {post.likes.length}
            </Link>
            {post && user && post.user === user.userName ? (
              <Link className="text-red mx-3" onClick={() => deletePost(post._id, user.userName)}>
                <MDBIcon icon="trash-alt" />
              </Link>
            ) : null}
          </div>
          <div className="line-divider"></div>
          <div className="post-text">
            <p style={{ fontSize: '16px' }}>{post.postText ? post.postText : ''}</p>
          </div>
          <div className="line-divider"></div>
          {post.comments.length > 0
            ? post.comments.map((comment) => <CommentCard key={comment._id} post={post} comment={comment} />)
            : null}
          <NewComment post={post} />
        </div>
      </div>
    </div>
  );
};

PostContent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateLikes, deletePost })(PostContent);
