import { combineReducers } from "redux";
import { accountReducer, alertReducer, tasksReducer, TelegramReducer, telegramReducer, telegramUsersReducer } from "./public";
import { userListReducer } from "./users";
import { authReducer } from "./auth";

export const publicReducer = combineReducers(
    {
        alerts: alertReducer, telegram: telegramReducer,
        tasks: tasksReducer,
        account: accountReducer,
        Telegram: TelegramReducer,
        telegramUsers: telegramUsersReducer,
       
    });


export const usersReducer = combineReducers({
    telegram_user: userListReducer,
    auth : authReducer
})


 