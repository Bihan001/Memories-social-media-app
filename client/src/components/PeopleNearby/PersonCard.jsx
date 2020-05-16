import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateFollow } from '../../actions/auth';

const PersonCard = ({ profile, auth: { user }, updateFollow }) => {
  return (
    <div className="nearby-user">
      <div className="row">
        <div className="col-md-2 col-sm-2">
          <img
            src={
              profile.profilePicLink
                ? profile.profilePicLink.url
                : 'https://www.linuxtrainingacademy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
            }
            alt="user"
            className="profile-photo-lg"
          />
        </div>
        <div className="col-md-7 col-sm-7">
          <h5>
            <Link to={`/profile/${profile.userName}`} className="profile-link">
              {profile.fullName}
            </Link>
          </h5>
          <p>{profile.bio}</p>
          <p className="text-muted">{profile.country !== '' ? `Country: ${profile.country}` : ''}</p>
        </div>
        {user.userName === profile.userName ? null : (
          <Fragment>
            <div className="col-md-3 col-sm-3 d-flex justify-content-center align-items-center">
              <button
                id="followButton"
                className="btn btn-primary"
                onClick={() => updateFollow({ user_userName: user.userName, profile_userName: profile.userName })}
              >
                {profile.followers.find((prof) => prof.user === user.userName) ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

PersonCard.propTypes = {
  auth: PropTypes.object.isRequired,
  updateFollow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateFollow })(PersonCard);
