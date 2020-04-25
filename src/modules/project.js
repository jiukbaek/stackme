import {
  getProjectRandom,
  getProject,
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
const PROJECTS_MORE_SUCCESS = "project/PROJECTS_MORE_SUCCESS";
const PROJECTS_INIT = "project/PROJECTS_INIT";

export const projectsInit = () => ({
  type: PROJECTS_INIT,
});

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

export const getProjectAsync = (
  page = 1,
  perPage = 10,
  showing = false
) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_REQUEST });
  try {
    const result = await getProject(page, perPage, showing);

    dispatch({
      type: PROJECTS_SUCCESS,
      projects: result.data.data,
      pagination: result.data.pagenation,
    });
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

export const moreProjectAsync = (page) => async (dispatch, getState) => {
  dispatch({ type: PROJECT_REQUEST });
  try {
    const result = await getProject(page, 10, true);
    dispatch({
      type: PROJECTS_MORE_SUCCESS,
      projects: result.data.data,
      pagination: result.data.pagenation,
    });
  } catch (e) {
    if (e.response.status === 404) dispatch({ type: PROJECTS_FAIL, error: e });
  }
};

const initialState = {
  loading: false,
  projects: [],
  pagination: {},
  project: null,
  error: null,
};

export default function project(state = initialState, action) {
  switch (action.type) {
    case PROJECTS_INIT:
      return {
        ...state,
        loading: false,
        projects: [],
        error: null,
      };
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
        pagination: action.pagination,
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
        error: null,
      };
    case PROJECTS_MORE_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, ...action.projects],
        pagination: action.pagination,
        error: null,
      };
    default:
      return state;
  }
}
