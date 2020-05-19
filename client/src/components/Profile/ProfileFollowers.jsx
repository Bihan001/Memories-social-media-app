import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfile, getAllProfiles } from '../../actions/auth';
import PropTypes from 'prop-types';
import Spinner from '../layouts/spinner';
import Navbar from '../layouts/Navbar';
import ProfileCover from './ProfileCover';
import PersonCard from '../PeopleNearby/PersonCard';
import UserActivity from './UserActivity';
import '../css/style1.css';

const ProfileFollowers = ({ auth: { user, profiles, profile, loading }, getAllProfiles, getProfile, match }) => {
  useEffect(() => {
    getProfile(match.params.userName);
    getAllProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProfile]);
  var fUser = null;

  const findUser = () => {
    if (!fUser) {
      fUser = profiles && profiles.find((prof) => prof.userName === match.params.userName);
    }
    return fUser;
  };

  return !profiles || loading ? (
    <Spinner />
  ) : !profile ? (
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
                <div className="col-md-7">
                  <div className="people-nearby">
                    {profiles && profiles.length > 0 && findUser().followers.length > 0 ? (
                      profiles
                        .filter((prof) => prof.following.find((prof1) => prof1.user === match.params.userName))
                        .map((profile) => <PersonCard key={profile.userName} profile={profile} />)
                    ) : (
                      <h4 className="text-center">No people found...</h4>
                    )}
                  </div>
                </div>
                <div className="col-md-2 static">
                  <div id="sticky-sidebar">
                    <h4 className="grey-text">{profile && `${profile.firstName}'s Activity`}'s Activity`}</h4>
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

ProfileFollowers.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfile, getAllProfiles })(ProfileFollowers);
