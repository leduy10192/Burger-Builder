import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    //temporay reversal for ingredients 'till we learn asynchonous redux
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedSt)
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false, // in case we have an error earlier and now don't have it anymore
        totalPrice: 4
    })
}

const fetchIngredientFailed = (state) => {
    return updateObject(state, { error: true });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient( state, action );
        case actionTypes.SET_INGREDIENTS: return setIngredient( state, action );
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientFailed( state );
        default:
            return state;
    }
};

export default reducer

// case actionTypes.REMOVE_INGREDIENT:
// return{
//     ...state,
//     ingredients:{
//         ...state.ingredients,
//         //override a prop
//         [action.ingredientName]: state.ingredients[action.ingredientName] - 1
//     },
//     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
// };

// case actionTypes.SET_INGREDIENTS:
// return{
//     ...state,
//     // ingredients: action.ingredients,
//     ingredients: {
//         salad: action.ingredients.salad,
//         bacon: action.ingredients.bacon,
//         cheese: action.ingredients.cheese,
//         meat: action.ingredients.meat
//     },
//     error: false, // in case we have an error earlier and now don't have it anymore
//     totalPrice: 4
// }