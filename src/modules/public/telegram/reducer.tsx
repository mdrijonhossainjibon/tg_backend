import { ADD_TASK_FAILURE, ADD_TASK_SUCCESS, SET_QUERY_PARAMS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./constants";
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
        { title: 'Nur Islam Roman 💸🇧🇩', description: 'Follow the channel', path: 'file_0', url: 'Nur6432' },
        //{ title: 'OnlineEarning24 RIYAD', description: 'Follow the channel', path: 'file_2', url: 'OnlineEarning24RIYAD' },
        { title: 'Md Rijon Hossain Jibon || AIRDROP 🚀🪂', description: 'Follow the channel', path: 'file_1', url: 'mdrijonhossainjibon_airdrop' },
        { title: 'Crypto Rahi', description: 'Follow the channel', path: 'file_3', url: 'rahicrypto' }
      ],
    error: null,
    loading: false

};

export const tasksReducer = (state = initialStatetasks, action: TaskActions): TasksState => {
    switch (action.type) {
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, action.payload.task],
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



