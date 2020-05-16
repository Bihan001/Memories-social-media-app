import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAIL } from '../actions/types';

const initialStates = {
  request: {
    uploadRequest: false,
  },
};

export default function (state = initialStates, action) {
  const { type } = action;
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
    default:
      return state;
  }
}
