import axios from 'axios';

import * as actionTypes from './actionTypes';

//use this action to show a loading state or a spinner
export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (authData) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}
export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
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
                dispatch(authSuccess(response.data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
}


