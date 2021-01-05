import{ put} from 'redux-saga/effects'; //it delays the execution of the next step

import axios from '../../axios-order';
import * as actions from '../actions';

export function* initIngredientsSaga(action){
    try{
        const response = yield axios.get('/ingredients.json')
        yield put(actions.setIngredients(response.data));
    } catch(error){
        yield put(actions.fetchIngredientsFailed());
    }
}
