import React, { Fragment } from 'react';
import spinner from '../../images/loading.gif';

const Spinner = () => {
  return (
    <Fragment>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <img src={spinner} style={{ width: '100px', display: 'block', marginBottom: 50 }} alt="Loading..." />
      </div>
    </Fragment>
  );
};

export default Spinner;
