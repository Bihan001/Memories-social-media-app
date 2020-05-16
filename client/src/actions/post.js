import axios from 'axios';
import { setAlert } from './alert';
import { loadUser, getProfile } from './auth';

import {
  GET_USERPOSTS,
  GET_ALLPOSTS,
  GET_POST,
  USERPOSTS_ERROR,
  ALLPOSTS_ERROR,
  POST_ERROR,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from './types';

const proxy = 'http://localhost:5000';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const fileConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const getPost = (postid) => async (dispatch) => {
  try {
    const res = await axios.get(`${proxy}/api/post/${postid}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${proxy}/api/post/all`);
    dispatch({
      type: GET_ALLPOSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ALLPOSTS_ERROR,
    });
  }
};

export const getUserPosts = (userName) => async (dispatch) => {
  try {
    const res = await axios.get(`${proxy}/api/post/user/${userName}`);
    dispatch({
      type: GET_USERPOSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USERPOSTS_ERROR,
    });
  }
};

export const createPost = (formData, userName) => async (dispatch) => {
  dispatch({
    type: UPLOAD_REQUEST,
  });
  try {
    const res = await axios.post(`${proxy}/api/post/new`, formData, fileConfig);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
    dispatch({
      type: UPLOAD_SUCCESS,
    });
    dispatch(loadUser());
    dispatch(getProfile(userName));
    dispatch(getUserPosts(userName));
    dispatch(getAllPosts());
    dispatch(setAlert('Created post successfully', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
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

export const updateLikes = (postid, userName) => async (dispatch) => {
  try {
    const res = await axios.put(`${proxy}/api/post/update-like/${postid}`, null, config);
    dispatch({
      type: UPDATE_LIKES,
      payload: res.data,
    });
    dispatch(getUserPosts(userName));
    dispatch(getAllPosts());
  } catch (err) {
    dispatch({
      type: UPDATE_LIKES,
      payload: null,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

export const deletePost = (postid, userName) => async (dispatch) => {
  try {
    await axios.delete(`${proxy}/api/post/delete/${postid}`, null, config);
    dispatch({
      type: DELETE_POST,
    });
    dispatch(getUserPosts(userName));
  } catch (err) {
    dispatch({
      type: DELETE_POST,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

export const addComment = ({ postid, text }, userName) => async (dispatch) => {
  try {
    const res = await axios.put(`${proxy}/api/post/comment/add`, { postid, text }, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(getUserPosts(userName));
    dispatch(getAllPosts());
  } catch (err) {
    dispatch({
      type: ADD_COMMENT,
      payload: null,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

export const deleteComment = ({ postid, commentid }, userName) => async (dispatch) => {
  try {
    const res = await axios.delete(`${proxy}/api/post/comment/delete/${postid}/${commentid}`, null, config);
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });
    dispatch(getUserPosts(userName));
    dispatch(getAllPosts());
  } catch (err) {
    dispatch({
      type: DELETE_COMMENT,
      payload: null,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};
