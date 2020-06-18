import React, { useState } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ResetPassword = ({ changeVisibility }) => {
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const onOTPChange = (e) => {
    setOTP(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onPassword1Change = (e) => {
    setPassword1(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    onsignin();
  };

  const onsignin = () => changeVisibility('signin');

  return (
    <div className='log-reg-area sign'>
      <h2 className='log-title text-center'>Reset Password</h2>
      <form
        className='needs-validation'
        onSubmit={(e) => onSubmit(e)}
        noValidate
      >
        <div className='form-group grey-text'>
          <MDBInput
            label='Enter the OTP sent to your Email'
            icon='envelope'
            group
            type='text'
            required
            validate
            error='wrong'
            success='right'
            value={otp}
            onChange={(e) => onOTPChange(e)}
          />
        </div>
        <div className='form-group grey-text'>
          <MDBInput
            label='New Password'
            icon='envelope'
            group
            type='password'
            required
            validate
            error='wrong'
            success='right'
            value={password}
            onChange={(e) => onPasswordChange(e)}
          />
        </div>
        <div className='form-group grey-text'>
          <MDBInput
            label='Confirm Password'
            icon='envelope'
            group
            type='password'
            required
            validate
            error='wrong'
            success='right'
            value={password1}
            onChange={(e) => onPassword1Change(e)}
          />
        </div>
        <div className='submit-btns pt-0'>
          <MDBBtn outline color='cyan' size='sm' type='submit'>
            Change Password
          </MDBBtn>
        </div>
      </form>
    </div>
  );
};

ResetPassword.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ResetPassword);
