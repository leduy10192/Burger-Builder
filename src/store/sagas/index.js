//takeEvery allows us to listen to certain actions and do something when they occur
import { all, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga,  fetchOrdersSaga} from './order';

export function* watchAuth() {
    //listen to every action of type AUTH_INITIATE_LOGOUT, 
    // 2nd arg is the generator, the saga we want to executte when this action occur 
    // yield takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga);//execute in the future
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga); //also get expirationTime arg from checkAuthTimeOut
    // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);

    yield all([
        takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga),//execute in the future
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga), //also get expirationTime arg from checkAuthTimeOut
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ])
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder(){
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
