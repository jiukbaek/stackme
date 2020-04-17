import {
  login,
  logout,
  createUser,
  verifySignup,
  checkEmailCode,
} from "../service/auth";
import jwtDecode from "jwt-decode";

const AUTH_INIT = "auth/AUTH_INIT";
const AUTH_REQUEST = "auth/AUTH_REQUEST";
const LOGOUT = "auth/LOGOUT";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const AUTH_FAIL = "auth/AUTH_FAIL";
const USER_CREATE_SUCCESS = "auth/USER_CREATE_SUCCESS";
const USER_CREATE_FAIL = "auth/USER_CREATE_FAIL";
const USER_VERIFY = "auth/USER_VERIFY";

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;
const initialUser = user
  ? { user_id: user.user_id, user_name: user.user_name }
  : user;

const initialState = {
  loading: false,
  isLogined: user ? true : false,
  currentUser: initialUser,
  verify: 1,
  error: null,
};

export const authInit = () => ({ type: AUTH_INIT });

export const authFail = (msg) => ({
  type: AUTH_FAIL,
  error: msg,
});

export const loginAsync = (email, password) => async (
  dispatch,
  getState,
  { history }
) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const result = await login(email, password);
    const { id, name } = result.data.user;
    dispatch({
      type: LOGIN_SUCCESS,
      currentUser: { user_id: id, user_name: name },
    });
    history.push("/");
  } catch (e) {
    if (e.response.status === 404) dispatch(authFail("계정정보가 없습니다."));
    if (e.response.status === 401)
      dispatch(authFail("계정정보가 올바르지 않습니다."));
  }
};

export const logOut = () => (dispatch, getState, { history }) => {
  dispatch({ type: LOGOUT });
  logout();
  history.push("/");
};

export const createUserAsync = ({ email, password, name, birth }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const result = await createUser({ email, password, name, birth });
    dispatch({
      type: USER_CREATE_SUCCESS,
      user: { user_id: result.data.data.id, user_name: result.data.data.name },
    });
  } catch (e) {
    if (e.response.status === 409)
      dispatch({ type: AUTH_FAIL, error: "이미 가입 된 메일입니다." });
  }
};

export const verifySignupAsync = (email) => async (dispatch, getState) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const result = await verifySignup(email);
    dispatch({ type: USER_VERIFY, verify: 2 });
  } catch (e) {
    console.log(e);
    if (e.response.status === 409)
      dispatch({ type: AUTH_FAIL, error: "이미 가입 된 메일입니다." });
  }
};

export const checkEmailCodeAsync = (email, code) => async (
  dispatch,
  getState
) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const result = await checkEmailCode(email, code);
    dispatch({ type: USER_VERIFY, verify: 3 });
  } catch (e) {
    if (e.response.status === 401)
      dispatch({ type: AUTH_FAIL, error: "코드가 일치하지 않습니다." });
  }
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_INIT:
      return {
        ...state,
        loading: false,
        isLogined: false,
        error: null,
        verify: 1,
        currentUser: null,
      };
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        isLogined: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogined: true,
        currentUser: action.currentUser,
        error: null,
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        isLogined: false,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isLogined: false,
        error: null,
      };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.user,
        isLogined: false,
        error: null,
      };
    case USER_VERIFY:
      return {
        ...state,
        loading: false,
        error: null,
        verify: action.verify,
      };
    default:
      return state;
  }
}
