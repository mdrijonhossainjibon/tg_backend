import { RootState } from "modules";

export const SelectoUserLIst = (state : RootState) => state.users.userlist;
export const SelectoUser = (state : RootState) => state.users.userlist.user;
export const SelectoUserLIstLoading = (state : RootState) => state.users.userlist.loading;