import { getAllSkill } from "../service/skill";

const SKILL_REQUEST = "skill/SKILL_REQUEST";
const SKILL_REQUEST_SUCCESS = "skill/SKILL_REQUEST_SUCCESS";
const SKILL_REQUEST_FAIL = "skill/SKILL_REQUEST_FAIL";

const initialState = {
  loading: false,
  skills: null,
  error: null
};

export const getAllSkillAsync = () => async (dispatch, getState) => {
  dispatch({ type: SKILL_REQUEST });
  try {
    const result = await getAllSkill();
    dispatch({ type: SKILL_REQUEST_SUCCESS, skills: result.data.data });
  } catch (e) {}
};

export default function skill(state = initialState, action) {
  switch (action.type) {
    case SKILL_REQUEST:
      return {
        ...state,
        loading: true,
        skills: state.skills ? state.skills : null,
        error: null
      };
    case SKILL_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        skills: action.skills,
        error: null
      };
    case SKILL_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        skills: null,
        error: action.error
      };
    default:
      return state;
  }
}
