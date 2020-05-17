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
    <div className="log-reg-area reg">
      <h2 className="log-title text-center">Register</h2>
      <form className="needs-validation" onSubmit={(e) => onSubmit(e)} noValidate>
        <div className="form-group">
          <div className="row grey-text" id="signupNames">
            <div className="col-12 col-md-6">
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
            <div className="col-12 col-md-6">
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
              <i className="mtrl-select"></i>
            </div>
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
        <div className="d-flex flex-column flex-md-row ">
          {/* <div className="checkbox">
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
          </div> */}
          <div className="submit-btns">
            <MDBBtn
              outline
              color="cyan"
              size="sm"
              type="submit"
              disabled={request && !isAuthenticated}
              style={{ marginLeft: 0 }}
            >
              Register
            </MDBBtn>
          </div>
          <Link to="#" title="" className="forgot-pwd pt-2" onClick={onsignin}>
            Already have an account?
          </Link>
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
