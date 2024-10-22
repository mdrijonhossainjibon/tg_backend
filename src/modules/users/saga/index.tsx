import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_USER_REQUEST, FETCH_TELEGRAM_USERS_REQUEST } from "../constants";
import { API_CALL, TypeApiPromise } from  'API_CALL';
import { fetchTelegramUsersSuccess, fetchUseraddSuccess } from "../action";


function* fetchUserSaga() {
    try {
        const { response }: TypeApiPromise = yield call(API_CALL, {   url: '/admin/users' });
        yield put(fetchUseraddSuccess(response?.result))

    } catch (error) {

    }
}




function * tgsaga() {
    try {
        const { response }: TypeApiPromise = yield call(API_CALL, {    url: '/getalluser' });
        if (response && response.result) {
            yield put(fetchTelegramUsersSuccess(response.result as any)) 
        }


      
        
    } catch (error) {

    }
}


export function* userlistSaga() {
    yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
    yield takeLatest(FETCH_TELEGRAM_USERS_REQUEST, tgsaga)
}
