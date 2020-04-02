import { getUser, modifyUser } from "../service/user";

const USER_REQUEST = "user/USER_REQUEST";
const USER_SUCCESS = "user/USER_SUCCESS";
const USER_FAIL = "user/USER_FAIL";
const USER_MODIFY = "user/USER_MODIFY";

const initialState = {
  loading: false,
  user: null,
  error: null
};

export const getUserAsync = id => async (dispatch, getState) => {
  dispatch({ type: USER_REQUEST });
  try {
    const user = await getUser(id);
    dispatch({ type: USER_SUCCESS, user: user.data.data });
  } catch (e) {
    console.log(e.response);
    dispatch({ type: USER_FAIL, error: e });
  }
};

export const modifyUserAsync = modifyObj => async (dispatch, getState) => {
  const id = getState().user.user.id;
  const user = await modifyUser(id, modifyObj);
  dispatch({ type: USER_SUCCESS, user: user.data.data });
};

export default function user(state = initialState, action) {
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
    case USER_MODIFY:
      return { ...state, loading: false, user: action.user, error: null };
    default:
      return state;
  }
}
