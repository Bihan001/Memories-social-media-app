import React, { Fragment, useEffect, useState } from 'react';
import { MDBInput } from 'mdbreact';
import { connect } from 'react-redux';
import { editUser } from '../../actions/auth';
import { profilePicUpload } from '../../actions/fileUploads';
import PropTypes from 'prop-types';
import Spinner from '../layouts/spinner';
import Navbar from '../layouts/Navbar';
import ProfileCover from './ProfileCover';
import UserActivity from './UserActivity';

const ProfileEdit = ({ history, auth: { user, loading }, editUser, profilePicUpload, match }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    country: '',
  });
  useEffect(() => {
    setFormData({
      firstName: loading || !user.firstName ? '' : user.firstName,
      lastName: loading || !user.lastName ? '' : user.lastName,
      dob: loading || !user.dob ? '' : user.dob,
      gender: loading || !user.gender ? '' : user.gender,
      bio: loading || !user.bio ? '' : user.bio,
      phone: loading || !user.phone ? '' : user.phone,
      address: loading || !user.address ? '' : user.address,
      country: loading || !user.country ? '' : user.country,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  const onFocus = (e) => {
    e.currentTarget.type = 'date';
  };
  const onBlur = (e) => {
    e.currentTarget.type = 'text';
  };
  const { firstName, lastName, dob, gender, bio, phone, address, country } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeText = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    document.querySelector('#pp_text').classList.add('valid');
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const imgData = new FormData();
    imgData.append('image', file);
    profilePicUpload(imgData, history, true, user && user.userName);
    editUser(formData, history, true);
  };

  return loading || !user ? (
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
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="d-flex justify-content-center grey-text">
                      <div style={{ width: '70%' }}>
                        <h3 className="grey-text text-center">Edit Profile</h3>
                        <div className="row">
                          <div className="col-6">
                            <MDBInput
                              label="First Name"
                              icon="user"
                              name="firstName"
                              value={firstName}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                          <div className="col-6">
                            <MDBInput
                              label="Last Name"
                              icon="user"
                              name="lastName"
                              value={lastName}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                        <MDBInput
                          label="Date of Birth"
                          icon="calendar-alt"
                          group
                          type="text"
                          placeholder="Date of Birth"
                          onFocus={onFocus}
                          onBlur={onBlur}
                          name="dob"
                          value={dob}
                          onChange={(e) => onChange(e)}
                        />
                        <MDBInput
                          label="Gender"
                          icon="transgender"
                          name="gender"
                          value={gender}
                          onChange={(e) => onChange(e)}
                        />
                        <MDBInput label="Bio" icon="user" name="bio" value={bio} onChange={(e) => onChange(e)} />
                        <MDBInput label="Phone" icon="user" name="phone" value={phone} onChange={(e) => onChange(e)} />
                        <MDBInput
                          label="Address"
                          icon="user"
                          name="address"
                          value={address}
                          onChange={(e) => onChange(e)}
                        />
                        <MDBInput
                          label="Country"
                          icon="user"
                          name="country"
                          value={country}
                          onChange={(e) => onChange(e)}
                        />
                        <div className="d-flex align-items-center md-form">
                          <button className="btn-primary">
                            <span>Choose file</span>
                            <input type="file" style={{ opacity: 0 }} onChange={(e) => changeText(e)} />
                          </button>
                          <div className="file-path-wrapper ml-3">
                            <input
                              className="file-path validate mb-0"
                              id="pp_text"
                              type="text"
                              placeholder="Change Profile Photo"
                              style={{ fontSize: 15 }}
                              value={filename}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <button type="submit" className="btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
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

ProfileEdit.propTypes = {
  auth: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  profilePicUpload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editUser, profilePicUpload })(ProfileEdit);
