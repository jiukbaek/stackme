import {
  getProjectRandom,
  getMyProject,
  registProject
} from "../service/project";

const PROJECT_REQUEST = "project/PROJECT_REQUEST";
const PROJECT_RANDOM = "project/PROJECT_RANDOM";
const PROJECTS_SUCCESS = "project/PROJECTS_SUCCESS";
const PROJECTS_FAIL = "project/PROJECTS_FAIL";
const PROJECT_REGIST = "project/PROJECT_REGIST";

export const projectRandom = count => async (dispatch, getState) => {
  dispatch({ type: PROJECT_REQUEST });
  try {
    const result = await getProjectRandom(count);
    dispatch({ type: PROJECTS_SUCCESS, projects: result.data.data });
  } catch (e) {
    if (e.response.status === 404)
      dispatch({ type: PROJECTS_SUCCESS, projects: [] });
    if (e.response.status === 403)
      dispatch({ type: PROJECTS_FAIL, error: "Unauth" });
  }
};

export const projectRegistAsync = values => async (
  dispatch,
  getState,
  { history }
) => {
  dispatch({ type: PROJECT_REQUEST });
  try {
    const result = await registProject(values);
    dispatch({ type: PROJECT_REGIST, project: result.data.data });
    history.goBack();
  } catch (e) {}
};

export const getMyProjectAsync = () => async (dispatch, getState) => {
  dispatch({ type: PROJECT_REQUEST });
  try {
    const result = await getMyProject();
    dispatch({ type: PROJECTS_SUCCESS, projects: result.data.data });
  } catch (e) {
    if (e.response.status === 404)
      dispatch({ type: PROJECTS_SUCCESS, projects: [] });
    if (e.response.status === 403)
      dispatch({ type: PROJECTS_FAIL, error: "Unauth" });
  }
};

const initialState = {
  loading: false,
  projects: [],
  error: null
};

export default function project(state = initialState, action) {
  switch (action.type) {
    case PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        projects: state.projects ? state.projects : [],
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
        projects: [],
        error: action.error
      };
    case PROJECT_REGIST:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, action.project],
        error: null
      };
    default:
      return state;
  }
}
