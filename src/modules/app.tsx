import { combineReducers } from "redux";
import { alertReducer, telegramReducer } from "./public";

export const publicReducer = combineReducers(
    { 
        alerts : alertReducer , telegram: telegramReducer 

    });
