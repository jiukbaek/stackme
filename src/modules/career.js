import {
  getCareer,
  createCareer,
  modifyCareer,
  deleteCareer,
} from "../service/career";

const CAREER_REQUEST = "career/CAREER_REQUEST";
const CAREER_SUCCESS = "career/CAREER_SUCCESS";
const CAREER_FAIL = "career/CAREER_FAIL";
const CAREER_REGIST = "career/CAREER_REGIST";
const CAREER_REGIST_FAIL = "career/CAREER_REGIST_FAIL";
const CAREER_MODIFY_SUCCESS = "carrer/CAREER_MODIFY_SUCCESS";
const CAREER_DELETE = "career/CAREER_DELETE";

const initialState = {
  loading: false,
  careers: null,
  error: null,
};

export const getCareerAsync = () => async (dispatch, getState) => {
  dispatch({ type: CAREER_REQUEST });
  try {
    const result = await getCareer();
    dispatch({ type: CAREER_SUCCESS, career: result.data.data });
  } catch (e) {
    dispatch({ type: CAREER_FAIL, error: e.response });
  }
};

export const createCareerAsync = (company, duty, join_date, end_date) => async (
  dispatch,
  getState
) => {
  dispatch({ type: CAREER_REQUEST });
  try {
    const result = await createCareer(company, duty, join_date, end_date);
    dispatch({ type: CAREER_REGIST, career: result.data.data });
  } catch (e) {
    if (e.response.status === 404)
      dispatch({ type: CAREER_REGIST_FAIL, error: "fail" });
  }
};

export const modifyCareerAsync = (id, values) => async (dispatch, getState) => {
  dispatch({ type: CAREER_REQUEST });
  const result = await modifyCareer(id, values);
  dispatch({ type: CAREER_MODIFY_SUCCESS, career: result.data.data });
};

export const deleteCareerAsync = (id) => async (dispatch, getState) => {
  dispatch({ type: CAREER_REQUEST });
  const result = await deleteCareer(id);
  dispatch({ type: CAREER_DELETE, career: result.data.data });
};

export default function career(state = initialState, action) {
  switch (action.type) {
    case CAREER_REQUEST:
      return {
        ...state,
        loading: true,
        careers: state.careers ? state.careers : null,
        error: null,
      };
    case CAREER_SUCCESS:
      return { ...state, loading: false, careers: action.career, error: null };
    case CAREER_FAIL:
      return { ...state, loading: false, careers: null, error: action.error };
    case CAREER_REGIST:
      return {
        ...state,
        loading: false,
        careers: [action.career, ...state.careers],
        error: null,
      };
    case CAREER_REGIST_FAIL:
      return { ...state, loading: false, error: action.error };
    case CAREER_MODIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        careers: state.careers.map((career) =>
          career.id === action.career.id ? action.career : career
        ),
        error: null,
      };
    case CAREER_DELETE:
      return {
        ...state,
        loading: false,
        careers: state.careers.filter((career) => {
          if (career.id === action.career.id) return false;
          return true;
        }),
      };
    default:
      return state;
  }
}
