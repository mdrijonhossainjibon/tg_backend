
import { combineReducers } from 'redux';
import { AlertState } from './public';
import { publicReducer } from './app';

export const rootReducer = combineReducers({ public : publicReducer  });


export interface RootState {
    public: {
        alerts: AlertState; 
        telegram : any
    };
    
}

export * from './public';