import React, { useState } from 'react';
import { MDBBtn, MDBCardImage } from 'mdbreact';
import { withRouter } from 'react-router-dom';
import { profilePicUpload } from '../../actions/fileUploads';
import { loadUser } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Signup3 = ({
  profilePicUpload,
  history,
  auth: { user, isAuthenticated },
  fileUploads: {
    request: { uploadRequest: request },
  },
}) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');
  const changeText = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    document.querySelector('#pp_text').classList.add('valid');
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    !request && profilePicUpload(formData, history, true, user && user.userName);
  };
  return (
    <div className="log-reg-area reg">
      <h2 className="log-title text-center pb-2">Upload your photo</h2>
      <MDBCardImage
        className="img-fluid mx-auto d-block"
        src={
          user && user.profilePicLink
            ? user.profilePicLink.url
            : 'https://www.linuxtrainingacademy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
        }
        waves
      />
      <form className="md-form my-3 signup3 container" onSubmit={(e) => onSubmit(e)}>
        <div className="file-field">
          <div className="d-inline-flex flex-column flex-md-row">
            <div className="btn btn-outline-success btn-sm float-left waves-effect waves-light">
              <span>Choose file</span>
              <input type="file" onChange={(e) => changeText(e)} style={{ width: 'fit-content' }} />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                id="pp_text"
                type="text"
                placeholder="Upload your file"
                value={filename}
              />
            </div>
          </div>
        </div>
        <div className="submit-btns pt-2 pb-0 my-0">
          <MDBBtn outline color="cyan" size="sm" type="submit" value="Upload" disabled={request && !isAuthenticated}>
            Upload
          </MDBBtn>
        </div>
      </form>
      <MDBBtn
        size="sm"
        onClick={() => {
          history.push('/newsfeed');
        }}
      >
        Proceed
      </MDBBtn>
    </div>
  );
};

Signup3.propTypes = {
  profilePicUpload: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  fileUploads: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  fileUploads: state.fileUploads,
});

export default connect(mapStateToProps, { profilePicUpload, loadUser })(withRouter(Signup3));
