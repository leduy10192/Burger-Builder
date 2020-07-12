import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = ( state, action ) => {
    return updateObject(state, { purchased: false });// for purchased to always reset when we revisit the checkout container
}
const purchaseStart = ( state, action ) => {
    return updateObject(state, { loading: true });
}
const purchaseBurgerSuccess = ( state, action ) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}
const purchaseBurgerFail = ( state, action ) => {
    return updateObject(state, { loading: false }); //error should be handled with withErrorHandler
}
const fetchOrderStart = ( state, action ) => {
    return updateObject(state, { loading: true });
}
const fetchOrderSuccess= ( state, action ) => {
    return updateObject(state, {
        orders: action.orders, //store fetched orders
        loading: false
    })
}
const fetchOrderFail = ( state, action ) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart( state, action );
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess ( state, action );
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail  ( state, action );
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart( state, action );
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess ( state, action );
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail( state, action );
        default: return state;
    }
};

export default reducer;


// import * as actionTypes from '../actions/actionTypes';

// const initialState = {
//     orders: [],
//     loading: false,
//     purchased: false
// }

// const reducer = (state = initialState, action) => {
//     switch(action.type) {
//         case actionTypes.PURCHASE_INIT:
//             return{
//                 ...state,
//                 purchased: false // for purchased to always reset when we revisit the checkout container
//             }
//         case actionTypes.PURCHASE_BURGER_START:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case actionTypes.PURCHASE_BURGER_SUCCESS:
//             const newOrder = {
//                 ...action.orderData,
//                 id: action.orderId
//             }
//             return {
//                 ...state,
//                 loading: false,
//                 purchased: true,
//                 orders: state.orders.concat(newOrder)
//             };
//         case actionTypes.PURCHASE_BURGER_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 //error should be handled with withErrorHandler
//             };
//         case actionTypes.FETCH_ORDERS_START:
//             return {
//                 ...state,
//                 loading: true //same as Checkout Page
//             };
//         case actionTypes.FETCH_ORDERS_SUCCESS:
//             return{
//                 ...state,
//                 orders: action.orders, //store fetched orders
//                 loading: false
//             };
//         case actionTypes.FETCH_ORDERS_FAIL:
//             return{
//                 ...state,
//                 loading: false
//             };
//         default:
//             return state;
//     }
// };

// export default reducer;