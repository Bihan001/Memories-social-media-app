import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
} from "mdbreact";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth: { user } }) => {
  const [state, setState] = useState({ collapseID: "" });
  const toggleCollapse = (collapseID) => () =>
    setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  return (
    <MDBNavbar
      dark
      expand="md"
      style={{ marginTop: "0px", paddingTop: "3px", paddingBottom: "3px" }}
    >
      <MDBNavbarBrand>
        <strong className="light-text">
          <Link style={{ color: "white" }} to="/newsfeed">
            Memories
          </Link>
        </strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse("navbarCollapse3")} />
      <MDBCollapse id="navbarCollapse3" isOpen={state.collapseID} navbar>
        <MDBNavbarNav right className="d-flex align-items-center">
          <MDBNavItem className="mr-2" style={{ fontSize: "15px" }}>
            <MDBNavLink
              className="waves-effect waves-light"
              to="#!"
              onClick={logout}
            >
              <MDBIcon icon="fas fa-door-closed" className="mr-1" />
              Logout
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
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
