import React, { Fragment, useEffect } from 'react';
import { MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import PropTypes from 'prop-types';
import Spinner from '../layouts/spinner';
import Navbar from '../layouts/Navbar';
import ProfileCover from './ProfileCover';
import UserActivity from './UserActivity';
import '../css/style1.css';

const ProfileAbout = ({ auth: { user, loading, profile }, match }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadUser]);
  return loading && !profile && !user ? (
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
                  <div className="about-profile pl-3">
                    <div className="about-content-block">
                      <h4 className="grey-text">
                        <MDBIcon icon="book" /> Bio
                      </h4>
                      <p>{profile && profile.bio ? profile.bio : 'Hey there, I am using Memories.'}</p>
                    </div>
                    <div className="about-content-block">
                      <h4 className="grey-text">
                        <MDBIcon icon="birthday-cake" /> Date of Birth
                      </h4>
                      <p>{profile && profile.dob ? profile.dob : ''}</p>
                    </div>
                    <div className="about-content-block">
                      <h4 className="grey-text">
                        <MDBIcon icon="transgender" /> Gender
                      </h4>
                      <p>{profile && profile.gender ? profile.gender : 'OTHER'}</p>
                    </div>
                    <div className="about-content-block">
                      <h4 className="grey-text">
                        <MDBIcon icon="phone-alt" /> Phone
                      </h4>
                      <p>{profile && profile.phone ? profile.phone : ''}</p>
                    </div>
                    <div className="about-content-block">
                      <h4 className="grey-text">
                        <MDBIcon icon="home" /> Address
                      </h4>
                      <p>{profile && profile.address ? profile.address : ''}</p>
                    </div>
                    <div className="about-content-block">
                      <h4 className="grey-text">
                        <MDBIcon icon="map-marked-alt" /> Country
                      </h4>
                      <p>{profile && profile.country ? profile.country : ''}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 static">
                  <div id="sticky-sidebar">
                    <h4 className="grey-text">{user && `${user.firstName}'s Activity`}</h4>
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

ProfileAbout.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(ProfileAbout);
