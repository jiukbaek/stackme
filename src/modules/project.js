import {
  getProjectRandom,
  getMyProject,
  registProject,
  getProjectId,
  modifyProject,
  deleteProject,
} from "../service/project";

const PROJECT_REQUEST = "project/PROJECT_REQUEST";
const PROJECT_RANDOM = "project/PROJECT_RANDOM";
const PROJECTS_SUCCESS = "project/PROJECTS_SUCCESS";
const PROJECTS_FAIL = "project/PROJECTS_FAIL";
const PROJECT_REGIST = "project/PROJECT_REGIST";
const PROJECT_SUCCESS = "project/PROJECT_SUCCESS";
const PROJECT_FAIL = "project/PROJECT_FAIL";
const PROJECT_MODIFY = "project/PROJECT_MODIFY";
const PROJECT_DELETE = "project/PROJECT_DELETE";

export const projectRandom = (count) => async (dispatch, getState) => {
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

export const projectRegistAsync = (values) => async (
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

export const getProjectIdAsync = (id) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_REQUEST });
  try {
    const result = await getProjectId(id);
    dispatch({ type: PROJECT_SUCCESS, project: result.data.data });
  } catch (e) {}
};

export const projectModifyAsync = (values) => async (
  dispatch,
  getState,
  { history }
) => {
  dispatch({ type: PROJECT_REQUEST });
  try {
    const result = await modifyProject(values);
    dispatch({ type: PROJECT_MODIFY, project: result.data.data });
    history.goBack();
  } catch (e) {}
};

export const deleteProjectAsync = (id) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_REQUEST });
  try {
    const result = await deleteProject(id);
    dispatch({ type: PROJECT_DELETE, project: result.data.data });
  } catch (e) {}
};

const initialState = {
  loading: false,
  projects: [],
  project: null,
  error: null,
};

export default function project(state = initialState, action) {
  switch (action.type) {
    case PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        projects: state.projects ? state.projects : [],
        project: state.project ? state.project : null,
        error: null,
      };
    case PROJECT_RANDOM:
      return {};
    case PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects,
        error: null,
      };
    case PROJECTS_FAIL:
      return {
        ...state,
        loading: false,
        projects: [],
        error: action.error,
      };
    case PROJECT_REGIST:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, action.project],
        error: null,
      };
    case PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.project,
        error: null,
      };
    case PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        project: null,
        error: action.error,
      };
    case PROJECT_MODIFY:
      return {
        ...state,
        loading: false,
        projects: state.projects.map((project) => {
          if (project.id === action.project.id) return action.project;
          return project;
        }),
        project: action.project,
        error: null,
      };
    case PROJECT_DELETE:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter((project) => {
          if (project.id === action.project.id) return false;
          return true;
        }),
      };
    default:
      return state;
  }
}
