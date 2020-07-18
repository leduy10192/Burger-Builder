import axios from 'axios';

import * as actionTypes from './actionTypes';

//use this action to show a loading state or a spinner
export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        // authData: authData
        idToken: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeOut = ( expirationTime ) => {
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000) // exec a func after an amont of time ( milliseconds )
    }
}

//holding the async code and doing authentication 
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACZC3EJHLHx9rU6Xgitpsm50npdetg6P4'
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACZC3EJHLHx9rU6Xgitpsm50npdetg6P4'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken) //key - value
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch((err) => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) { //if token is null 
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));//when retrieved from local storage it's a string
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    };
}