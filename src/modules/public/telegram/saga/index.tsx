import { takeLatest, call, put } from "redux-saga/effects";
import { UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE, GET_ACCOUNT_REQUEST, ADD_ACCOUNT_REQUEST } from "../constants";
import { API_CALL, API_CALL_PROPS, TypeApiPromise } from "API_CALL";
import { addAccountSuccess, alertPush, getAccountRequest, updateTaskSuccess } from "modules";


const confing: API_CALL_PROPS = {}
// Worker saga: will be fired on UPDATE_TASK_REQUEST actions
function* updateTask(action: any) {


    const { response, status }: TypeApiPromise = yield call(API_CALL, { ...confing, url: '/ck_channel', method: 'POST', body: action.payload })

    if (status === 200) {
        yield put(updateTaskSuccess(response?.result as any))
        return;
    }
    yield put(alertPush({ message: [response?.message as string], type: 'message', status: 'error' }));
    yield put({ type: UPDATE_TASK_FAILURE, payload: { message: response?.message as string } });
}


function* fetchAccount(action: any) {
    try {
       
        if (!window.Telegram.WebApp.initDataUnsafe.user) {
            yield put(alertPush({ message: ['Telegram WebApp not available'] , type : 'message' , status : 'error' }));
            return;
        }
        
        const { response, status }  = yield call(API_CALL, { ...confing, url: `/get-account/${action.payload.user.id}`, method: 'GET'  });
        
        if (status === 200) {
            yield put(addAccountSuccess(response.user));
           
            return ;
        }
         if (response?.message === 'User not found.') {
            return;
         }
        yield put(alertPush({ message: [ response?.message as string ] }))
    } catch (error: any) {
        yield put(alertPush({ message: [error.message] }))
    }
}


function* addAccount(action: any) {
    try {

        const { response, status }  = yield call(API_CALL, { ...confing, url: `/create-account`, method: 'POST', body : action.payload });
        
        if (status === 200 ||status === 201) {
            yield put(addAccountSuccess(response.user));
            yield put(getAccountRequest( response));
            return ;
        }
        yield put(alertPush({ message: [ response?.message as string ] }))
    } catch (error: any) {
        yield put(alertPush({ message: [error.message] }))
    }
}

// Watcher saga
export function* rootTelegramsaga() {
    yield takeLatest(UPDATE_TASK_REQUEST, updateTask); // Listen for UPDATE_TASK_REQUEST and call updateTask
    yield takeLatest(GET_ACCOUNT_REQUEST, fetchAccount);
    yield takeLatest(ADD_ACCOUNT_REQUEST, addAccount);
}
