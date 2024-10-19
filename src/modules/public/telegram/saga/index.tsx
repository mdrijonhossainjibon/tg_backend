import { takeLatest, call, put } from "redux-saga/effects";
import { UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE, GET_ACCOUNT_REQUEST } from "../constants";
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


function* fetchAccount(action : any) {
try {
    
    const { response , status } : TypeApiPromise = yield call(API_CALL, { ...confing,   url :  `/get-accoun`  , method : 'POST' , params : { id : action.payload.user.id  } });
    console.log(response)
} catch (error :any) {
    yield put(alertPush({ message : [error.message]}))
}
}
   

// Watcher saga
export function* rootTelegramsaga() {
    yield takeLatest(UPDATE_TASK_REQUEST, updateTask); // Listen for UPDATE_TASK_REQUEST and call updateTask
    yield takeLatest(GET_ACCOUNT_REQUEST, fetchAccount);
}
