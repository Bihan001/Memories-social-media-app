import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBNotification } from 'mdbreact';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    // <div key={alert.id} className={`mt-4 alert alert-${alert.alertType}`}>
    //   {alert.msg}
    // </div>

    <MDBNotification
      key={alert.id}
      show
      fade
      icon={alert.alertType === 'danger' ? 'exclamation-triangle' : 'check-circle'}
      iconClassName={alert.alertType === 'danger' ? 'text-danger' : 'text-success'}
      title={alert.alertType === 'danger' ? 'Error' : 'Success'}
      message={alert.msg}
      text={new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}
    />
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
