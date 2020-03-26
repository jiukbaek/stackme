import { getProjectRandom } from "../service/project";

const PROJECT_REQUEST = "project/PROJECT_REUQEST";
const PROJECT_RANDOM = "project/PROJECT_RANDOM";
const PROJECTS_SUCCESS = "project/PROJECTS_SUCCESS";
const PROJECTS_FAIL = "project/PROJECTS_FAIL";

export const projectRandom = count => async (dispatch, getState) => {
  dispatch({ type: PROJECT_REQUEST });
  try {
    const result = await getProjectRandom(count);
    dispatch({ type: PROJECTS_SUCCESS, projects: result.data });
  } catch (e) {
    dispatch({ type: PROJECTS_FAIL, error: e });
  }
};

const initialState = {
  loading: false,
  projects: null,
  error: null
};

export default function project(state = initialState, action) {
  switch (action.type) {
    case PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        projects: null,
        error: null
      };
    case PROJECT_RANDOM:
      return {};
    case PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects,
        error: null
      };
    case PROJECTS_FAIL:
      return {
        ...state,
        loading: false,
        projects: null,
        error: action.error
      };
    default:
      return state;
  }
}
