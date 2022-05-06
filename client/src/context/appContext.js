import React, { useReducer, useContext,useEffect } from "react";
import reducer from "./reducer";
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
  CHANGE_PAGE
  
} from "./actions";
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userDesignation = localStorage.getItem("designation");

export const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  userDesignation: userDesignation || "",
  showSidebar: false,
  domain: userDesignation || "",
  isEditing: false,
  editTaskId: '',
  assignee: '',
  task: '',
  taskTypeOptions: ['minor', 'major', 'critical', 'blocker'],
  taskType: 'critical',
  statusOptions: ['todo', 'inprogress', 'completed'],
  status: 'inprogress',
  tasks: [],
  totalTasks: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyTasks:[],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/",
  });
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token, designation }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("designation", designation);
    console.log(localStorage);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("designation");
  };
  const setupUser = async ({ currentUser, endPoint }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`/auth/${endPoint}`, currentUser);

      const { user, token, designation } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, designation },
      });
      addUserToLocalStorage({ user, token, designation });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      // no token
      const { user, designation, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, designation, token },
      });

      addUserToLocalStorage({ user, designation, token:initialState.token});
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  }
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    })
  }
  const clearValue = () =>{
    dispatch({ type: CLEAR_VALUES})
  }
  const createTask = async () => {
    dispatch({ type: CREATE_TASK_BEGIN })
    try {
      const { task, assignee, domain, taskType, status } = state
  
      await authFetch.post('/tasks', {
        task,
        assignee,
        domain,
        taskType,
        status,
      })
      dispatch({
        type: CREATE_TASK_SUCCESS,
      })
      // call function instead clearValues()
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_TASK_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
  }
  const getTasks = async () => {
    const { page, search, searchStatus, searchType, sort } = state
    let url = `/tasks?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_TASKS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { tasks, totalTasks, numOfPages } = data
      dispatch({
        type: GET_TASKS_SUCCESS,
        payload: {
          tasks,
          totalTasks,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
  }
  
  useEffect(() => {
    getTasks()
    // eslint-disable-next-line
  }, [])
  const setEditTask = (id) => {
    dispatch({ type: SET_EDIT_TASK, payload: { id } })
  }
  const editTask =async () => {
    dispatch({ type: EDIT_TASK_BEGIN })
  try {
    const { assignee, task, domain, taskType, status } = state

    await authFetch.patch(`/tasks/${state.editTaskId}`, {
      assignee,
      task,
      domain,
      taskType,
      status,
    })
    dispatch({
      type: EDIT_TASK_SUCCESS,
    })
    dispatch({ type: CLEAR_VALUES })
  } catch (error) {
    if (error.response.status === 401) return
    dispatch({
      type: EDIT_TASK_ERROR,
      payload: { msg: error.response.data.msg },
    })
  }
  }
  const deleteTask = async(taskId) =>{
    dispatch({ type: DELETE_TASK })
  try {
    await authFetch.delete(`/tasks/${taskId}`)
    getTasks()
  } catch (error) {
    logoutUser()
  }
  }
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch('/tasks/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyTasks: data.monthlyTasks,
        },
      })
    } catch (error) {
console.log(error.response)
      // logoutUser()
    }
  }
  const clearFilters=()=>{
    dispatch({type:CLEAR_FILTER})
  }
  const changePage=(page)=>{
    dispatch({type:CHANGE_PAGE , payload: { page } })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValue,
        createTask,
        getTasks,
        setEditTask,
        deleteTask,
        editTask,
        showStats,
        clearFilters,
        changePage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
