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
} from '../actions/types';

const initialStates = {
  post: null,
  allPosts: [],
  userPosts: [],
  loading: true,
  request: {
    uploadRequest: false,
  },
};

export default function (state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case UPLOAD_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          uploadRequest: true,
        },
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        request: {
          ...state.request,
          uploadRequest: false,
        },
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        request: {
          ...state.request,
          uploadRequest: false,
        },
      };
    case GET_POST:
    case UPDATE_LIKES:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case GET_USERPOSTS:
      return {
        ...state,
        userPosts: payload,
        loading: false,
      };
    case GET_ALLPOSTS:
      return {
        ...state,
        allPosts: payload,
        loading: false,
      };
    case POST_ERROR:
    case DELETE_POST:
      return {
        ...state,
        post: null,
        loading: false,
      };
    case ALLPOSTS_ERROR:
      return {
        ...state,
        allPosts: [],
        loading: false,
      };
    case USERPOSTS_ERROR:
      return {
        ...state,
        userPosts: [],
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    default:
      return state;
  }
}
