
import { combineReducers } from 'redux';
import { AlertState, QueryParams, rootalertsaga, rootTelegramsaga, TasksState } from './public';
import { publicReducer } from './app';
import { all, call } from 'redux-saga/effects';
 
 

export const rootReducer = combineReducers({ public : publicReducer  });

export function* rootSaga() {
    yield all([
      call(rootalertsaga),
      call(rootTelegramsaga)
    ])

}

export interface RootState {
    public: {
        alerts: AlertState; 
        telegram : QueryParams;
        tasks : TasksState
    };
    
}

export * from './public';