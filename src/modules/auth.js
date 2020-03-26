import { login, logout } from "../service/auth";
import jwtDecode from "jwt-decode";

const LOGIN_REQUEST = "auth/LOGIN_REQUEST";
const LOGOUT = "auth/LOGOUT";
const LOGIN_EMPTY_PARAM = "auth/LOGIN_EMPTY_PARAM";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "auth/LOGIN_FAIL";

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;
const initialUser = user
  ? { user_id: user.user_id, user_name: user.user_name }
  : user;

const initialState = {
  logging: false,
  isLogined: user ? true : false,
  currentUser: initialUser,
  error: null
};

export const loginEmptyParam = () => ({
  type: LOGIN_EMPTY_PARAM,
  error: "이메일 혹은 비밀번호가 입력되지 않았습니다."
});

export const loginAsync = (email, password) => async (
  dispatch,
  getState,
  { history }
) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const result = await login(email, password);
    const { id, name } = result.data.user;
    dispatch({
      type: LOGIN_SUCCESS,
      currentUser: { user_id: id, user_name: name }
    });
    history.push("/");
  } catch (e) {
    dispatch({ type: LOGIN_FAIL, error: "계정 정보가 없습니다" });
  }
};

export const logOut = () => (dispatch, getState, { history }) => {
  dispatch({ type: LOGOUT });
  logout();
  history.push("/");
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        logging: true,
        isLogined: false,
        error: null
      };
    case LOGIN_EMPTY_PARAM:
      return {
        ...state,
        logging: true,
        isLogined: false,
        error: action.error
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        logging: false,
        isLogined: true,
        currentUser: action.currentUser,
        error: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        logging: false,
        isLogined: false,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        logging: false,
        isLogined: false,
        error: null
      };
    default:
      return state;
  }
}
