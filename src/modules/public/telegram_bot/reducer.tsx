import {   FETCH_BOT_CONFIG_FAILURE, FETCH_BOT_CONFIG_REQUEST, FETCH_BOT_CONFIG_SUCCESS, FETCH_CHANNEL_CONFIG_FAILURE, FETCH_CHANNEL_CONFIG_REQUEST, FETCH_CHANNEL_CONFIG_SUCCESS, FETCH_TELEGRAM_USERS_FAILURE, FETCH_TELEGRAM_USERS_REQUEST, FETCH_TELEGRAM_USERS_SUCCESS, RESET_TELEGRAM_USERS } from "./constants";
import { TelegramAction, TelegramState } from "./types";

export interface TelegramUsersState {
    loading: boolean;
    users: any[];
    error: string | null;
}


const initialState: TelegramState = {
    botConfig: {
        token: '',
        toggle_bot: 'off',
        withdraw: 'disabled',
        tg_group : []
    },
    channelConfig: [],
    loading: false,
    error: null,
};



const telegraminitialState: TelegramUsersState = {
    loading: false,
    users: [],
    error: null
};



export const TelegramReducer = (state: TelegramState = initialState, action: TelegramAction): TelegramState => {
    switch (action.type) {
        case FETCH_BOT_CONFIG_REQUEST:
        case FETCH_CHANNEL_CONFIG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null, // Reset the error on new requests
            };
        case FETCH_BOT_CONFIG_SUCCESS:
            return {
                ...state,
                loading: false,
                botConfig: {
                    ...state.botConfig,
                    ...action.payload, // Merge botConfig payload with the current state
                },
            };
        case FETCH_CHANNEL_CONFIG_SUCCESS:
            return {
                ...state,
                loading: false,
                channelConfig: [...action.payload as any], // Ensure channelConfig is treated as an array
            };
        case FETCH_BOT_CONFIG_FAILURE:
        case FETCH_CHANNEL_CONFIG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload, // Set the error payload
            };
        default:
            return state;
    }
};



export const telegramUsersReducer = (state = telegraminitialState, action: any): TelegramUsersState => {
    switch (action.type) {
        case FETCH_TELEGRAM_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        
        case FETCH_TELEGRAM_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload, error: null };
        
        case FETCH_TELEGRAM_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        
        case RESET_TELEGRAM_USERS:
            return telegraminitialState;
        
        default:
            return state;
    }
};