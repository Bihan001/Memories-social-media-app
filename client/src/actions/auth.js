import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_PROFILES,
  GET_PROFILE,
  UPDATE_FOLLOW,
  LOGIN_REQUEST,
  REGISTRATION_REQUEST,
} from './types';
import setAuthToken from '../utils/setAuthToken';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

//Load User

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getProfile = (userName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/auth/profile/${userName}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
    });
  }
};

export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/auth/all`);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILES,
    });
  }
};

//Register User

export const register = (formData) => async (dispatch) => {
  dispatch({
    type: REGISTRATION_REQUEST,
  });
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post(`/api/users`, body, config);
    dispatch(setAlert('Account created successfully', 'success'));
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`/api/auth`, body, config);
    dispatch(setAlert('Logged in successfully', 'success'));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Update User

export const editUser = (formData, history, edit = false) => async (dispatch) => {
  const body = JSON.stringify(formData);
  try {
    await axios.put(`/api/users/edit`, body, config);
    dispatch(loadUser());
    dispatch(setAlert('Account updated successfully', 'success'));
    if (!edit) {
      history.push('/newsfeed');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

//Update Follows

export const updateFollow = ({ user_userName, profile_userName }) => async (dispatch) => {
  const body = JSON.stringify({ user_userName, profile_userName });
  try {
    await axios.put(`/api/users/update-follow`, body, config);
    dispatch(loadUser());
    dispatch(getAllProfiles());
    // dispatch(getProfile(profile_userName));
    dispatch({
      type: UPDATE_FOLLOW,
    });
  } catch (err) {
    dispatch({
      type: 'FOLLOW_UPDATE_FAIL',
    });
  }
};

//Logout

export const logout = () => (dispatch) => {
  // dispatch({
  //   type: CLEAR_PROFILE,
  // });
  dispatch({
    type: LOGOUT,
  });
};
