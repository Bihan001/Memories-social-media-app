import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserImg from '../../images/userimg.png';

const NewsfeedRightSideBar = ({ auth: { user, profiles } }) => {
  return (
    <div className="col-md-2 static">
      <div className="suggestions" id="sticky-sidebar">
        <h5 className="grey-text text-md-center text-left pl-md-0 pl-3">Suggestions</h5>
        {profiles && profiles.length > 0 ? (
          profiles
            .filter((profile) => profile.userName !== user.userName)
            .map((profile) => (
              <div key={profile.userName} className="follow-user d-flex align-items-center">
                <img
                  src={
                    profile.profilePicLink
                      ? profile.profilePicLink.url
                      : UserImg
                  }
                  alt=""
                  className="profile-photo-sm pull-left"
                />
                <div className="ml-md-2 pl-md-3 ml-4 mt-3">
                  <p style={{ fontSize: '16px' }}>
                    <Link to={`/profile/${profile.userName}`}>{profile.fullName}</Link>
                  </p>
                </div>
              </div>
            ))
        ) : (
          <h4>No people found...</h4>
        )}

        {/* <div className="follow-user d-flex">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
            alt=""
            className="profile-photo-sm pull-left"
          />
          <div className="ml-md-auto pl-md-3 ml-4">
            <h5>
              <Link to="#!">Ore Sama</Link>
            </h5>
            <Link to="#" className="text-green">
              Follow
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

NewsfeedRightSideBar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(NewsfeedRightSideBar);
