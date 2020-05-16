import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBInput } from 'mdbreact';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Signup = ({
  setAlert,
  changeVisibility,
  register,
  auth: {
    isAuthenticated,
    request: { registrationRequest: request },
  },
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    password2: '',
  });
  const { firstName, lastName, password, password2, email, userName } = formData;
  const onsignin = () => changeVisibility('signin');
  const onsignup2 = () => changeVisibility('signup2');
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += ' was-validated';
    if (password !== password2) {
      console.log('Passwords do not match');
      setAlert('Passwords do not match', 'danger');
      setFormData({ ...formData, password2: '' });
    } else {
      !request && register({ firstName, lastName, userName, email, password });
    }
  };

  if (isAuthenticated && !request) {
    onsignup2();
  }
  return (
    <div class="log-reg-area reg">
      <h2 class="log-title text-center">Register</h2>
      <form className="needs-validation" onSubmit={(e) => onSubmit(e)} noValidate>
        <div class="row grey-text" id="signupNames">
          <div class="col-6">
            <MDBInput
              label="First name"
              icon="user"
              group
              type="text"
              validate
              required
              error="wrong"
              success="right"
              name="firstName"
              value={firstName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="col-6">
            <MDBInput
              label="Last name"
              icon="user"
              group
              type="text"
              validate
              required
              error="wrong"
              success="right"
              name="lastName"
              value={lastName}
              onChange={(e) => onChange(e)}
            />
            <i class="mtrl-select"></i>
          </div>
        </div>
        <div className="form-group grey-text">
          <MDBInput
            label="Your email"
            icon="envelope"
            group
            type="email"
            validate
            required
            error="wrong"
            success="right"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group grey-text">
          <MDBInput
            label="Username"
            icon="user"
            group
            type="text"
            validate
            required
            error="wrong"
            success="right"
            name="userName"
            value={userName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group grey-text">
          <MDBInput
            label="Your password"
            icon="lock"
            group
            type="password"
            validate
            required
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group grey-text">
          <MDBInput
            label="Confirm password"
            icon="lock"
            group
            type="password"
            required
            validate
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="d-flex">
          <div className="checkbox">
            <MDBInput
              label={
                <>
                  Accept&nbsp;
                  <a href="!#" className="blue-text">
                    the Terms and Conditions
                  </a>
                </>
              }
              type="checkbox"
              id="checkbox1"
            />
          </div>
          <Link to="#" title="" className="forgot-pwd ml-auto" onClick={onsignin}>
            Already have an account?
          </Link>
        </div>
        <div class="submit-btns">
          <MDBBtn outline color="cyan" size="sm" type="submit" disabled={request && !isAuthenticated}>
            Register
          </MDBBtn>
        </div>
      </form>
    </div>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, register })(Signup);
