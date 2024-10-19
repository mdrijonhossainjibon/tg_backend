import { ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "./constants";

// types.ts
export interface Task {
    title: string;
    description: string;
    path: string;
    url: string;
  }
  
  export interface AddTaskSuccessResponse {
    loading: boolean; 
    task: Task;
  }
  
  export interface UpdateTaskSuccessResponse {
    task: Task;
  }
  
  export interface ApiError {
    message: string;
  }
  
  export interface TasksState {
    tasks: Task[];
    error: string | null;
    loading: boolean; // Add loading state
}

  
  export interface AddTaskRequestAction {
    type: typeof ADD_TASK_REQUEST;
    payload: Task;
  }
  
  export interface UpdateTaskRequestAction {
    type: typeof UPDATE_TASK_REQUEST;
    payload: Task & { id: string }; // Assuming `id` is part of the payload for updates
  }
  
  // Action Types
  export type TaskActions =
    | AddTaskRequestAction
    | { type: typeof ADD_TASK_SUCCESS; payload: AddTaskSuccessResponse }
    | { type: typeof ADD_TASK_FAILURE; payload: ApiError }
    | UpdateTaskRequestAction
    | { type: typeof UPDATE_TASK_SUCCESS; payload: UpdateTaskSuccessResponse }
    | { type: typeof UPDATE_TASK_FAILURE; payload: ApiError };
  