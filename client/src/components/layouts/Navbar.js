import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBCardImage,
} from 'mdbreact';
import './css/Navbar.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, auth: { user } }) => {
  const [state, setState] = useState({ collapseID: '' });
  const toggleCollapse = (collapseID) => () =>
    setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : '',
    }));
  return (
    <>
      <div className="lol">
        <MDBNavbar color="info-color" dark expand="md" style={{ marginTop: '0px' }}>
          <MDBNavbarBrand>
            <strong className="light-text">
              <Link style={{ color: 'white' }} to="/">
                Memories
              </Link>
            </strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={toggleCollapse('navbarCollapse3')} />
          <MDBCollapse id="navbarCollapse3" isOpen={state.collapseID} navbar>
            <MDBNavbarNav right className="d-flex align-items-center">
              <MDBNavItem className="mr-2">
                <MDBNavLink className="waves-effect waves-light" to={`/profile/${user && user.userName}`}>
                  <span className="d-flex flex-row align-items-center">
                    <MDBCardImage
                      className="img-fluid mr-2 mb-0 d-none d-md-block"
                      src={
                        user && user.profilePicLink
                          ? user.profilePicLink.url
                          : 'https://www.linuxtrainingacademy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
                      }
                      style={{ width: 25, height: 25, borderRadius: '50%' }}
                      waves
                    />
                    <MDBIcon icon="user-circle" className="mr-1 d-block d-md-none" />
                    Profile
                  </span>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem className="mr-2">
                <MDBNavLink className="waves-effect waves-light" to="#!" onClick={logout}>
                  <MDBIcon icon="fas fa-door-closed" className="mr-1" />
                  Logout
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
