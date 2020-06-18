import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_PROFILES,
  GET_PROFILE,
  LOGIN_REQUEST,
  REGISTRATION_REQUEST,
  FORGOTPASS_REQUEST,
  RESETPASS_REQUEST,
  FORGOTPASS_SUCCESS,
  FORGOTPASS_FAIL,
  RESETPASS_SUCCESS,
  RESETPASS_FAIL,
} from '../actions/types';

const initialStates = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  profiles: [],
  profile: null,
  request: {
    loginRequest: false,
    registrationRequest: false,
    forgotpassRequest: false,
    resetpassRequest: false,
  },
};

export default function (state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          loginRequest: true,
        },
      };
    case REGISTRATION_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          registrationRequest: true,
        },
      };
    case FORGOTPASS_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          forgotpassRequest: true,
        },
      };
    case RESETPASS_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          resetpassRequest: true,
        },
      };
    case FORGOTPASS_SUCCESS:
    case FORGOTPASS_FAIL:
      return {
        ...state,
        request: {
          ...state.request,
          forgotpassRequest: false,
        },
      };
    case RESETPASS_SUCCESS:
    case RESETPASS_FAIL:
      return {
        ...state,
        request: {
          ...state.request,
          resetpassRequest: false,
        },
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        request: {
          loginRequest: false,
          registrationRequest: false,
        },
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        request: {
          loginRequest: false,
          registrationRequest: false,
        },
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        profile: null,
        profiles: null,
        request: {
          loginRequest: false,
          registrationRequest: false,
        },
      };
    default:
      return state;
  }
}
