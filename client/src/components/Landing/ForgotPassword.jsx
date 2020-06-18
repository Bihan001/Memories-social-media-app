import React, { useState } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ForgotPassword = ({
  changeVisibility,
  auth: {
    request: { forgotpassRequest: request },
  },
}) => {
  const [email, setEmail] = useState('');
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    onEmailEnter();
  };

  const onsignin = () => changeVisibility('signin');
  const onEmailEnter = () => changeVisibility('resetpass');

  return (
    <div className='log-reg-area sign'>
      <h4 className='log-title text-center'>
        Feature currently not available :( <br /> Work in Progress...
      </h4>
      {/* <form
        className='needs-validation'
        onSubmit={(e) => onSubmit(e)}
        noValidate
      >
        <div className='form-group grey-text'>
          <MDBInput
            label='Your email'
            icon='envelope'
            group
            type='email'
            required
            validate
            error='wrong'
            success='right'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='submit-btns pt-0'>
          <MDBBtn outline color='cyan' size='sm' type='submit'>
            Send OTP
          </MDBBtn>
        </div>
        <div className='d-flex pt-4 ml-2'>
          <p style={{ width: '50%' }}>
            <Link to='#!' className='forgot-pwd ml-auto' onClick={onsignin}>
              Back to SignIn
            </Link>
          </p>
        </div>
      </form> */}
    </div>
  );
};

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ForgotPassword);
