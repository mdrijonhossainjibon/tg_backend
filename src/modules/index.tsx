
import { combineReducers } from 'redux';
import { AccountState, AlertState, QueryParams, rootalertsaga, rootTelegramsaga, TasksState, TelegramRootSaga, TelegramState, TelegramUsersState } from './public';
import { publicReducer } from './app';
import { all, call } from 'redux-saga/effects';
import { AuthState } from './auth';
 
 

export const rootReducer = combineReducers({ public : publicReducer  });

export function* rootSaga() {
    yield all([
      call(rootalertsaga),
      call(rootTelegramsaga),
      call( TelegramRootSaga)
    ])

}

export interface RootState {
    public: {
        alerts: AlertState; 
        telegram : QueryParams;
        tasks : TasksState;
        account : AccountState;
        telegramUsers: TelegramUsersState ;
        Telegram : TelegramState;
        
    };
    users : {
        auth : AuthState
    }
    
}

export * from './public';



