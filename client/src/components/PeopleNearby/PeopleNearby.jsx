import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/auth';
import PropTypes from 'prop-types';
import Spinner from '../layouts/spinner';
import Navbar from '../layouts/Navbar';
import NewsfeedLeft from '../Newsfeed/Newsfeed_Left';
import NewsfeedRightSideBar from '../Newsfeed/NewsfeedRightSideBar';
import PersonCard from './PersonCard';
import '../css/style1.css';

const PeopleNearby = ({ auth: { profiles }, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return !profiles ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <div id="page-contents">
        <div className="container">
          <div className="row">
            <NewsfeedLeft />
            <div className="col-md-7">
              <div className="people-nearby">
                {profiles && profiles.length > 0 ? (
                  profiles.map((profile) => <PersonCard key={profile.userName} profile={profile} />)
                ) : (
                  <h4>No people found...</h4>
                )}
              </div>
            </div>
            <NewsfeedRightSideBar />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PeopleNearby.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllProfiles })(PeopleNearby);
