import { ADD_TASK_REQUEST, ADD_TASK_SUCCESS, SET_QUERY_PARAMS, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS , UPDATE_TASK_FAILURE, GET_ACCOUNT_REQUEST, ADD_ACCOUNT_REQUEST, ADD_ACCOUNT_SUCCESS } from "./constants";
import { QueryParams } from "./reducer";
import { AddTaskSuccessResponse,   UpdateTaskSuccessResponse } from "./type";

 

export const setQueryParams = (queryParams: QueryParams) => {
  return {
    type: SET_QUERY_PARAMS,
    payload: queryParams,
  };
};

export const addTaskSuccess = (response: AddTaskSuccessResponse) => ({
    type: ADD_TASK_SUCCESS,
    payload: response,
});

export const updateTaskSuccess = (response: UpdateTaskSuccessResponse) => ({
    type: UPDATE_TASK_SUCCESS,
    payload: response,
});

export const updatedREQUEST = (payload  : any) =>({
    type : UPDATE_TASK_REQUEST,
    payload  
});
 

export const getAccountRequest = (payload : any ) => ({
    type: GET_ACCOUNT_REQUEST,
    payload 
  });

  export const addAccountRequest = (payload : any) => ({
    type: ADD_ACCOUNT_REQUEST,
    payload 
  });


  export const addAccountSuccess = (payload : any) => ({
    type: ADD_ACCOUNT_SUCCESS,
    payload 
  });