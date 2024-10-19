import { combineReducers } from "redux";
import { alertReducer, tasksReducer, telegramReducer } from "./public";

export const publicReducer = combineReducers(
    { 
        alerts : alertReducer , telegram: telegramReducer ,
        tasks : tasksReducer

    });