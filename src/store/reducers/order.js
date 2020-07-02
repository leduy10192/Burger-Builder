import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false // for purchased to always reset when we revisit the checkout container
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                //error should be handled with withErrorHandler
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true //same as Checkout Page
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders: action.orders, //store fetched orders
                loading: false
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;