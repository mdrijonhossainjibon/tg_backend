
import { API_CALL, TypeApiPromise, API_CALL_PROPS } from  'API_CALL';

import { signInFailure, SignInRequestAction, signInSuccess } from '../actions';
import { alertPush } from 'modules';
import { call, put } from 'redux-saga/effects';
import { getCsrfToken, setCsrfToken } from 'helpers';
 


const signConfig: API_CALL_PROPS = {
	apiVersion: '1.0', 
};

export function* signInSaga(action: SignInRequestAction) {

	try {


		const { response, status }: TypeApiPromise = yield call(API_CALL, { ...signConfig, url: '/identity/sessions', method: 'POST', body: action.payload })
		 

		if (response) {
			if ( status === 200 && response.result && response.result.user) {

				setCsrfToken(response.result.user.csrf_token as string)
				yield put(signInSuccess(response.result.user));
				 
	 
				return;
			}
	 
			   
			if (response.message  && response.message.error) {
				yield put(alertPush({ message: [response?.message?.error] }));
	
			    yield put(signInFailure(response?.message?.error));
				return;
			}
	
		}
		yield put(alertPush({ message: [response?.message?.error] }));

	} catch (error: any) {
		yield put(alertPush({ message: [error.message] }));

		yield put(signInFailure(error));
	}
}


export function* siginUser(action: SignInRequestAction) {
	try {

		
		const { response, status }: TypeApiPromise = yield call(API_CALL, { ...signConfig, url: '/identity/sessions/verify', method: 'POST',  headers : {  "X-CSRF-Token" : getCsrfToken()  } })

		if (response && status === 200 && response.result && response.result.user) {
			yield put(signInSuccess(response.result.user));
		 
			return;
		}
		if (response?.message?.error === 'CSRF token is missing')  return;

		yield put(alertPush({ message: [response?.message?.error] }));
		yield put(signInFailure(response?.message?.error));
	} catch (error) {

	}
}