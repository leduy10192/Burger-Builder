import{ put, delay, call } from 'redux-saga/effects'; //it delays the execution of the next step
// import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import axios from 'axios';

//saga is kind of a function but not 100%
//the * turns the function into a generator, which are next generation JS features which 
//functions that can be executed incrementally. You can call them but they don't run from
//start to end immediately but you can pause during function execution,e.g., to wait for async
//In a generator, we should prefix each step we execute with the 'yield' keyword
//each step has to finished for the next step to execute (even async)
export function* logoutSaga(action) {
    //copy from actions/auth.js
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userId");
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime*1000);
    yield put(actions.logout()); //lead to logoutSaga
    // setTimeout(() => {
    //     dispatch(logout())
    // }, expirationTime * 1000)
}

export function* authUserSaga(action) {
    // dispatch(authStart());
    yield put(actions.authStart);
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACZC3EJHLHx9rU6Xgitpsm50npdetg6P4'
    if(!action.isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACZC3EJHLHx9rU6Xgitpsm50npdetg6P4'
    }
    //with 'yield' added axios does not return a promise but execution is paused here until this promise is resolved or rejected
    //  and then store whatever we get back in 'response' constant.
    try { //try if we can get a successful res or dispatch authFail
    const response = yield axios.post(url, authData)
    // All the codes that depend on response now can execute kinda synchronously
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
    //localStorage is a synchorous actions so we don't really need to pause but we can still add yield for consistency
    yield localStorage.setItem('token', response.data.idToken) //key - value
    yield localStorage.setItem('expirationDate', expirationDate)
    yield localStorage.setItem('userId', response.data.localId)
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeOut(response.data.expiresIn));
    } catch(err){
        yield put(actions.authFail(err.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
        const token = yield localStorage.getItem('token');
        if(!token) { //if token is null 
            yield put(actions.logout());
        } else {
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));//when retrieved from local storage it's a string
            if(expirationDate <= new Date()){
                yield put(actions.logout());
            }else {
                const userId = yield localStorage.getItem('userId');
                yield put(actions.authSuccess(token, userId));
                yield put(actions.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
}