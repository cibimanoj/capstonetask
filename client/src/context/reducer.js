import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  GET_TASKS_BEGIN,
  GET_TASKS_SUCCESS,
  SET_EDIT_TASK,
  DELETE_TASK,
  EDIT_TASK_BEGIN,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTER,
  CHANGE_PAGE,
} from "./actions";
import { initialState } from "./appContext";
const reducer = (state, action) => {
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userDesignation: action.payload.designation,
      domain: action.payload.designation,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userDesignation: "",
      domain: "",
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userDesignation: action.payload.designation,
      domain: action.payload.designation,
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return { ...state,page:1,  [action.payload.name]: action.payload.value };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editTaskId: "",
      task: "",
      assignee: "",
      domain: state.userDesignation,
      taskType: "critical",
      status: "inprogress",
    };
    return { ...state, ...initialState };
  }
  if (action.type === CREATE_TASK_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_TASK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CREATE_TASK_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === GET_TASKS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_TASKS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      tasks: action.payload.tasks,
      totalTasks: action.payload.totalTasks,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === SET_EDIT_TASK) {
    const edit = state.tasks.find((task) => task._id === action.payload.id);
    const { _id, assignee, task, domain, taskType, status } = edit;
    return {
      ...state,
      isEditing: true,
      editTaskId: _id,
      assignee,
      task,
      domain,
      taskType,
      status,
    };
  }
  if (action.type === DELETE_TASK) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_TASK_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_TASK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === EDIT_TASK_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyTasks: action.payload.monthlyTasks,
    };
  }
  if (action.type === CLEAR_FILTER) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  throw new Error(`no such action :${action.type}`);
};
export default reducer;
