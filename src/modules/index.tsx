
import { combineReducers } from 'redux';
import { AccountState, AlertState, ColorThemeState, QueryParams, rootalertsaga, rootTelegramsaga, TasksState, TelegramRootSaga, TelegramState, TelegramUsersState } from './public';
import { publicReducer, usersReducer } from './app';
import { all, call } from 'redux-saga/effects';
import { AuthState, rootAuthSaga } from './auth';
import { userlistSaga } from './users';



export const rootReducer = combineReducers({ public: publicReducer, users: usersReducer });

export function* rootSaga() {
    yield all([
        call(rootalertsaga),
        call(rootTelegramsaga),
        call(TelegramRootSaga),
        call(userlistSaga),
        call(rootAuthSaga)
    ])

}

export interface RootState {
    public: {
        alerts: AlertState;
        telegram: QueryParams;
        tasks: TasksState;
        account: AccountState;
        telegramUsers: TelegramUsersState;
        Telegram: TelegramState;
        colorTheme : ColorThemeState
    };
    users: {
        auth: AuthState;
        userlist : any
    }

}

export * from './public';
export * from './auth';



