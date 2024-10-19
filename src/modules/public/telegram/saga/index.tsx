import { takeLatest, call, put } from "redux-saga/effects";
import { UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE } from "../constants";
import { API_CALL, API_CALL_PROPS, TypeApiPromise } from "API_CALL";
import { alertPush, updateTaskSuccess } from "modules";
 

const confing : API_CALL_PROPS = {   }
// Worker saga: will be fired on UPDATE_TASK_REQUEST actions
function* updateTask( action : any ) {


     const { response , status } : TypeApiPromise = yield call(API_CALL, { ...confing,   url :  '/ck_channel'  , method : 'POST' , body : action.payload })
     
     if (status === 200) {
        yield put(updateTaskSuccess(response?.result as any))
        return ;
     }
     yield put(alertPush({ message : [ response?.message as string ] , type : 'message' , status : 'error'}));
     yield put({ type: UPDATE_TASK_FAILURE, payload: { message: response?.message as string } });
}

// Watcher saga
export function* rootTelegramsaga() {
    yield takeLatest(UPDATE_TASK_REQUEST, updateTask); // Listen for UPDATE_TASK_REQUEST and call updateTask
}
