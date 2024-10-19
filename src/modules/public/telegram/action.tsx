import { SET_QUERY_PARAMS } from "./constants";
import { QueryParams } from "./reducer";

 

export const setQueryParams = (queryParams: QueryParams) => {
  return {
    type: SET_QUERY_PARAMS,
    payload: queryParams,
  };
};
