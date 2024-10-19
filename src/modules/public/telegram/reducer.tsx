import { SET_QUERY_PARAMS } from "./constants";

 
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
