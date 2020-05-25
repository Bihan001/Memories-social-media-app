import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layouts/spinner';
import Navbar from '../layouts/Navbar';
import NewsfeedLeft from './Newsfeed_Left';
import PostCreateBox from '../Posts/PostCreateBox';
import PostContent from '../Posts/PostContent';
import NewsfeedRightSideBar from './NewsfeedRightSideBar';
import { getProfile, getAllProfiles } from '../../actions/auth';
import { getAllPosts } from '../../actions/post';

const Newsfeed = ({ auth: { user }, getProfile, getAllProfiles, getAllPosts, postState: { allPosts, loading } }) => {
  useEffect(() => {
    user && getProfile(user.userName);
    getAllProfiles();
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProfile]);
  return !user || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <div id="page-contents">
        <div className="container">
          <div className="row">
            <NewsfeedLeft />
            <div className="col-md-7">
              <PostCreateBox />
              {allPosts ? (
                allPosts.length > 0 ? (
                  allPosts.map((post) => <PostContent key={post._id} post={post} />)
                ) : (
                  <h4 className="text-center grey-text">
                    Nothing new...Write something or follow users to see new posts
                  </h4>
                )
              ) : (
                <Spinner />
              )}
            </div>
            <NewsfeedRightSideBar />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Newsfeed.propTypes = {
  auth: PropTypes.object.isRequired,
  postState: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  postState: state.post,
});

export default connect(mapStateToProps, { getProfile, getAllProfiles, getAllPosts })(Newsfeed);
