import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfile, getAllProfiles } from '../../actions/auth';
import { getUserPosts } from '../../actions/post';
import PropTypes from 'prop-types';
import Spinner from '../layouts/spinner';
import Navbar from '../layouts/Navbar';
import ProfileCover from './ProfileCover';
import PostCreateBox from '../Posts/PostCreateBox';
import ProfilePostContent from '../Posts/ProfilePostContent';
import UserActivity from './UserActivity';

const Profile = ({
  auth: { user, profile },
  getProfile,
  getAllProfiles,
  getUserPosts,
  postState: { userPosts, loading },
  match,
}) => {
  useEffect(() => {
    getProfile(match.params.userName);
    getAllProfiles(); //Required for Profile Cover
    getUserPosts(match.params.userName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return !profile || loading ? (
    <Spinner />
  ) : profile.userName !== match.params.userName ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <div id="page-contents-fluid">
        <div className="container">
          <div className="timeline">
            <ProfileCover match={match} />
            <div id="page-contents">
              <div className="row">
                <div className="col-md-3"></div>
                <div
                  className="col-md-7"
                  style={user.userName === match.params.userName ? null : { marginTop: '70px' }}
                >
                  {profile && user.userName === profile.userName ? <PostCreateBox /> : null}
                  {userPosts && userPosts.length > 0 && userPosts[0].user === match.params.userName ? (
                    userPosts.map((post) => <ProfilePostContent key={post._id} post={post} />)
                  ) : userPosts && userPosts.length > 0 ? (
                    <Spinner />
                  ) : profile ? (
                    user.userName === profile.userName ? (
                      <h4 className="text-center grey-text">You haven't posted anything yet...</h4>
                    ) : (
                      <h4 className="text-center grey-text">{profile.firstName} haven't posted anything yet...</h4>
                    )
                  ) : (
                    ''
                  )}
                </div>
                <div className="col-md-2 static">
                  <div id="sticky-sidebar">
                    <h4 className="grey-text">{profile && `${profile.firstName}'s Activity`}</h4>
                    <UserActivity />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  postState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  postState: state.post,
});

export default connect(mapStateToProps, { getProfile, getAllProfiles, getUserPosts })(Profile);
