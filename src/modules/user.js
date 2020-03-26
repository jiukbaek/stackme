import { getUser } from "../service/user";

const USER_REQUEST = "user/USER_REQUEST";
const USER_SUCCESS = "user/USER_SUCCESS";
const USER_FAIL = "user/USER_FAIL";

const initialState = {
  loading: false,
  user: null,
  error: null
};

export const getUserAsync = id => (dispatch, getState) => {
  getUser(id);
};

export function user(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true,
        user: null,
        error: null
      };
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        error: null
      };
    case USER_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.error
      };
    default:
      return state;
  }
}
