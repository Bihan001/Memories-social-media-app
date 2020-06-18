import React, { useState } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Signin = ({
  changeVisibility,
  login,
  auth: {
    isAuthenticated,
    request: { loginRequest: request },
  },
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const onsignup1 = () => changeVisibility('signup1');
  const onForgot = () => changeVisibility('forgotpass');
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    !request && login(email, password);
  };

  //If logged in, redirect to dashboard

  if (isAuthenticated) {
    return <Redirect to='/newsfeed' />;
  }
  return (
    <div className='log-reg-area sign'>
      <h2 className='log-title text-center'>Login</h2>
      <form
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
        <div className='form-group grey-text'>
          <MDBInput
            label='Your password'
            icon='lock'
            group
            type='password'
            required
            validate
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='d-flex pt-2'>
          <Link
            to='#!'
            onClick={onsignup1}
            style={{ width: '50%', fontSize: '.875rem' }}
          >
            New to Memories? Click Here
          </Link>

          <Link to='#!' onClick={onForgot} className='forgot-pwd ml-auto'>
            Forgot Password?
          </Link>
        </div>
        <div className='submit-btns pt-0'>
          <MDBBtn
            outline
            color='cyan'
            size='sm'
            type='submit'
            disabled={!isAuthenticated && request}
          >
            Login
          </MDBBtn>
        </div>
      </form>
    </div>
  );
};

Signin.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Signin);
