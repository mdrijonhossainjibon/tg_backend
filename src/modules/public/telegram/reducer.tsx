import { ADD_ACCOUNT_FAILURE, ADD_ACCOUNT_REQUEST, ADD_ACCOUNT_SUCCESS, ADD_TASK_FAILURE, ADD_TASK_SUCCESS, GET_ACCOUNT_FAILURE, GET_ACCOUNT_REQUEST, GET_ACCOUNT_SUCCESS, SET_QUERY_PARAMS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./constants";
import { TaskActions, TasksState } from "./type";


export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    allows_write_to_pm: boolean;
}

export interface QueryParams {
    user?: User;
    chat_instance?: string;
    chat_type?: string;
    start_param?: string;
    auth_date?: string;
    hash?: string;
}

const initialState: QueryParams = {};

export const telegramReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_QUERY_PARAMS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};



const initialStatetasks: TasksState = {
    tasks:  [
       
      ],
    error: null,
    loading: false
};

export const tasksReducer = (state = initialStatetasks, action: any): TasksState => {
    switch (action.type) {
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                tasks: [ ...action.payload ],
                error: null,
            };
        case ADD_TASK_FAILURE:
            return {
                ...state,
                error: action.payload.message,
            };
        case UPDATE_TASK_REQUEST:
            return {
                ...state,
                loading: true, // Set loading to true on request
                error: null,
            };
        case UPDATE_TASK_SUCCESS: {
            
            return {
                ...state,
                loading: false, // Set loading to false on success
                error : ''
            };
        }
        case UPDATE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.message,
            };
           
        default:
            return state;
    }
};





 
  
export interface AccountState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  const accountInitialState: AccountState = {
    user: null,
    loading: false,
    error: null,
  };
  
  export const accountReducer = (state = accountInitialState, action: any): AccountState => {
    switch (action.type) {
      case ADD_ACCOUNT_REQUEST:
      case GET_ACCOUNT_REQUEST:
        return { ...state, loading: true, error: null };
      case ADD_ACCOUNT_SUCCESS:
        return { ...state, loading: false, user: action.payload };
      case GET_ACCOUNT_SUCCESS:
        return { ...state, loading: false, user: action.payload };
      case ADD_ACCOUNT_FAILURE:
      case GET_ACCOUNT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
 
  