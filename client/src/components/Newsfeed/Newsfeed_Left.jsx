import React, { Fragment } from 'react';
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Newsfeed_Left = ({ auth: { user } }) => {
  return (
    <Fragment>
      <div className="col-md-3 static">
        <div id="chat-block">
          <div className="profile-card">
            <img
              src={
                user && user.profilePicLink
                  ? user.profilePicLink.url
                  : 'https://www.linuxtrainingacademy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
              }
              alt="user"
              className="profile-photo"
            />
            <h5 className="d-flex flex-wrap">
              <Link to={`/profile/${user && user.userName}`} className="text-white">
                {user && user.fullName}
              </Link>
            </h5>
            <Link to={`/followers/${user && user.userName}`} className="text-white">
              <MDBIcon icon="user-friends" /> {user && `${user.followers.length} Followers`}
            </Link>
          </div>
          {/* <!--profile card ends--> */}
          <ul className="nav-news-feed">
            <li>
              <MDBIcon far icon="newspaper" />
              <div>
                <Link to="/newsfeed">My Newsfeed</Link>
              </div>
            </li>
            <li>
              <MDBIcon icon="user-friends" />
              <div>
                <Link to="/people-nearby">People Nearby</Link>
              </div>
            </li>
            <li>
              <MDBIcon icon="users" />
              <div>
                <Link to={`/following/${user && user.userName}`}>Following</Link>
              </div>
            </li>
            <li>
              <MDBIcon icon="user-friends" />
              <div>
                <Link to={`/followers/${user && user.userName}`}>Followers</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

Newsfeed_Left.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Newsfeed_Left);
