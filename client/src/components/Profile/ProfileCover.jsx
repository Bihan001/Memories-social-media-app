import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFollow } from '../../actions/auth';

const ProfileCover = ({ auth: { user, profile, profiles }, updateFollow, match }) => {
  var fUser = null;
  const findUser = () => {
    if (!fUser) {
      fUser = profiles && profiles.find((prof) => prof.userName === match.params.userName);
    }
    return fUser;
  };
  return (
    <div className="timeline-cover">
      {/* <!--Timeline Menu for Large Screens--> */}
      <div className="timeline-nav-bar d-none d-md-block">
        <div className="row">
          <div className="col-md-3">
            <div className="profile-info">
              <img
                src={
                  profile && profile.profilePicLink
                    ? profile.profilePicLink.url
                    : 'https://www.linuxtrainingacademy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
                }
                alt=""
                className="img-responsive profile-photo"
              />
              <h3>{profile && profile.fullName}</h3>
            </div>
          </div>
          <div className="col-md-9">
            <ul className="list-inline profile-menu">
              <li>
                <Link match={match} to={`/profile/${match.params.userName}`}>
                  Timeline
                </Link>
              </li>
              <li>
                <Link to={`/profile/about/${match.params.userName}`}>About</Link>
              </li>
              {/* <li>
                <Link to={`/profile/album/${match.params.userName}`}>Album</Link>
              </li> */}
              <li>
                <Link to={`/followers/${match.params.userName}`}>Followers</Link>
              </li>
              <li>
                <Link to={`/following/${match.params.userName}`}>Following</Link>
              </li>
              {user && match.params.userName === user.userName ? (
                <li>
                  <Link match={match} to={`/profile/edit/${match.params.userName}`}>
                    Edit Profile
                  </Link>
                </li>
              ) : null}
            </ul>
            <ul className="follow-me list-inline d-flex align-items-center">
              <li style={{ paddingTop: '14px' }}>{findUser() && findUser().followers.length} people following him</li>
              {user.userName !== match.params.userName ? (
                <li>
                  <button
                    className="btn-primary"
                    onClick={() =>
                      updateFollow({ user_userName: user.userName, profile_userName: match.params.userName })
                    }
                  >
                    {findUser() && findUser().followers.find((prof) => prof.user === user.userName)
                      ? 'Unfollow'
                      : 'Follow'}
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
      {/* <!--Timeline Menu for Large Screens End-->
                  <!--Timeline Menu for Small Screens--> */}
      <div className="navbar-mobile d-md-none">
        <div className="profile-info">
          <img
            src={
              profile && profile.profilePicLink
                ? profile.profilePicLink.url
                : 'https://www.linuxtrainingacademy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
            }
            alt=""
            className="img-responsive profile-photo"
          />
          <h4>{profile && profile.fullName}</h4>
        </div>
        <div className="mobile-menu">
          <ul className="list-inline d-flex justify-content-center">
            <li>
              <Link match={match} to={`/profile/${match.params.userName}`}>
                Timeline
              </Link>
            </li>
            <li>
              <Link to={`/profile/about/${match.params.userName}`}>About</Link>
            </li>
            {/* <li>
              <Link to={`/profile/album/${match.params.userName}`}>Album</Link>
            </li> */}
            <li>
              <Link to={`/followers/${match.params.userName}`}>Followers</Link>
            </li>
            <li>
              <Link to={`/following/${match.params.userName}`}>Following</Link>
            </li>
            {user && match.params.userName === user.userName ? (
              <li>
                <Link match={match} to={`/profile/edit/${match.params.userName}`}>
                  Edit Profile
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="follow-me list-inline d-flex align-items-center justify-content-center">
            {user.userName !== match.params.userName ? (
              <li>
                <button
                  className="btn-primary"
                  onClick={() =>
                    updateFollow({ user_userName: user.userName, profile_userName: match.params.userName })
                  }
                >
                  {findUser() && findUser().followers.find((prof) => prof.user === user.userName)
                    ? 'Unfollow'
                    : 'Follow'}
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileCover.propTypes = {
  auth: PropTypes.object.isRequired,
  updateFollow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateFollow })(ProfileCover);
