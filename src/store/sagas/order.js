import { put } from "redux-saga/effects";
import axios from '../../axios-order';
import * as actions from '../actions';

//export new generator
export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try{
        //token and orderData are received as an arg in actionCreator
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
    }catch(error){
        yield put(actions.purchaseBurgerFail(error))
    }   
}

export function* fetchOrdersSaga(action){
    yield put(actions.fetchOrderStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId+ '"';//string should be in  ""
    try{
        const response = yield axios.get('/orders.json' + queryParams) // if we delete json, then UI will show network Error
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrderSuccess(fetchedOrders));
    }catch(error){
        yield put(actions.fetchOrderFail(error))
    }
}