import axios from 'axios';
import { setAlert } from './alert';
import { loadUser, getProfile } from './auth';
import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAIL } from './types';

const proxy = 'http://localhost:5000';

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const profilePicUpload = (formData, history, edit = false, userName) => async (dispatch) => {
  dispatch({
    type: UPLOAD_REQUEST,
  });
  try {
    await axios.post(`${proxy}/api/upload-profile-pic`, formData, config);
    dispatch({
      type: UPLOAD_SUCCESS,
    });
    dispatch(loadUser());
    dispatch(getProfile(userName));
    dispatch(setAlert('Image uploaded successfully', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch({
      type: UPLOAD_FAIL,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};
