import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { updateLikes, deletePost } from '../../actions/post';
import PropTypes from 'prop-types';
import CommentCard from './Comments/CommentCard';
import NewComment from './Comments/NewComment';

const ProfilePostContent = ({ auth: { user, profile }, post, updateLikes, deletePost }) => {
  return (
    <div className="post-content">
      <div className="post-date d-none d-sm-block">
        <h5 style={{ fontSize: 17, marginBottom: 0 }}>{profile.firstName}</h5>
        <p className="text-grey" style={{ fontSize: 12 }}>
          {post.date.slice(0, 10)}
        </p>
      </div>
      {post.postMedia ? <img src={post.postMedia.url} alt="" className="img-responsive post-image" /> : null}
      <div className="post-container d-flex">
        <img
          src={
            profile && profile.profilePicLink
              ? profile.profilePicLink.url
              : 'https://www.linuxtrainingacademy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
          }
          alt=""
          className="profile-photo-md pull-left"
        />
        <div className="post-detail ml-auto pl-3 mt-2">
          <div className="user-info">
            <h5>
              <Link to={`/profile/${post.user}`} className="profile-link">
                {profile && profile.fullName}
              </Link>{' '}
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
            {post.user === user.userName ? (
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

ProfilePostContent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateLikes, deletePost })(ProfilePostContent);
