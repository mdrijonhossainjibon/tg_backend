import { combineReducers } from "redux";
import { accountReducer, alertReducer, tasksReducer, TelegramReducer, telegramReducer, telegramUsersReducer } from "./public";

export const publicReducer = combineReducers(
    {
        alerts: alertReducer, telegram: telegramReducer,
        tasks: tasksReducer,
        account: accountReducer,
        Telegram: TelegramReducer,
        telegramUsers: telegramUsersReducer,
    });
