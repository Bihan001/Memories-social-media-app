import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import Signup2 from './Signup2';
import Signup3 from './Signup3';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Landing = () => {
  const [visibility, setVisibility] = useState('signin');
  // if (isAuthenticated && visibility !== 'signup' && visibility !== 'signup2' && visibility !== 'signup3') {
  //   return <Redirect to="/dashboard" />;
  // }
  const onChangeVisibility = (newVisibility) => {
    setVisibility(newVisibility);
  };
  return (
    <div className='theme-layout'>
      <div className='container-fluid pdng0'>
        <div className='row merged'>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
            <div className='land-featurearea'>
              <div className='land-meta'>
                <h1>Memories</h1>
                <p className='pt-1'>
                  ‘Time moves in one direction, memory in another’ – William
                  Gibson
                </p>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
            <div className='login-reg-bg'>
              {visibility === 'signin' ? (
                <Signin changeVisibility={onChangeVisibility} />
              ) : visibility === 'signup1' ? (
                <Signup changeVisibility={onChangeVisibility} />
              ) : visibility === 'signup2' ? (
                <Signup2 changeVisibility={onChangeVisibility} />
              ) : visibility === 'signup3' ? (
                <Signup3 changeVisibility={onChangeVisibility} />
              ) : visibility === 'forgotpass' ? (
                <ForgotPassword changeVisibility={onChangeVisibility} />
              ) : visibility === 'resetpass' ? (
                <ResetPassword changeVisibility={onChangeVisibility} />
              ) : (
                console.log('Invalid visibility')
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
