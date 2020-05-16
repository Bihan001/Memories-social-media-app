import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { withRouter } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { loadUser, editUser } from '../../actions/auth';
import PropTypes from 'prop-types';

const Signup2 = ({ setAlert, history, auth: { user, loading }, editUser, loadUser, changeVisibility }) => {
  const [formData, setFormData] = useState({
    bio: '',
    country: '',
    address: '',
    phone: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
  });
  const onsignup3 = () => changeVisibility('signup3');
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  const onFocus = (e) => {
    e.currentTarget.type = 'date';
  };
  const onBlur = (e) => {
    e.currentTarget.type = 'text';
  };
  const { bio, country, address, phone, dob, gender } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += ' was-validated';
    if (phone !== '' && (phone.length !== 10 || isNaN(phone))) {
      console.log('Enter a valid phone number');
      setAlert('Enter a valid phone number', 'danger');
    } else {
      editUser(formData, history, true);
      setTimeout(onsignup3(), 2000);
    }
  };
  return (
    <div class="log-reg-area reg">
      <h2 class="log-title text-center">Complete your profile</h2>
      <form className="needs-validation" onSubmit={(e) => onSubmit(e)} noValidate>
        <div className="form-group grey-text">
          <MDBInput
            label="Date of Birth"
            icon="calendar-alt"
            group
            type="text"
            placeholder="Date of Birth"
            onFocus={onFocus}
            onBlur={onBlur}
            validate
            required
            error="wrong"
            success="right"
            name="dob"
            value={dob}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group grey-text">
          <MDBInput
            label="Your Gender"
            icon="transgender"
            group
            type="text"
            validate
            required
            error="wrong"
            success="right"
            name="gender"
            value={gender}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group grey-text">
          <MDBInput
            label="Bio"
            icon="book"
            group
            type="text"
            validate
            error="wrong"
            success="right"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group grey-text">
          <MDBInput
            label="Phone"
            icon="phone"
            group
            type="text"
            validate
            error="wrong"
            success="right"
            name="phone"
            value={phone}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group grey-text">
          <MDBInput
            label="Address"
            icon="home"
            group
            type="text"
            validate
            error="wrong"
            success="right"
            name="address"
            value={address}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group grey-text">
          <MDBInput
            label="Country"
            icon="map"
            group
            type="text"
            validate
            error="wrong"
            success="right"
            name="country"
            value={country}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="submit-btns py-0 my-0">
          <MDBBtn
            outline
            color="cyan"
            size="sm"
            type="submit"
            onClick={() =>
              setFormData({
                ...formData,
                firstName: loading || !user.firstName ? '' : user.firstName,
                lastName: loading || !user.lastName ? '' : user.lastName,
              })
            }
          >
            Proceed
          </MDBBtn>
        </div>
      </form>
    </div>
  );
};

Signup2.propTypes = {
  setAlert: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, editUser, loadUser })(withRouter(Signup2));
