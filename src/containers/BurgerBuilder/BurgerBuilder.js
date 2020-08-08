import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
//Rename to actions
import * as actions from "../../store/actions/index" // we can omit index, index will auto pick index

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-order';
// import burger from '../../components/Burger/Burger';


export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        // loading: false,
        // error: false
    }

    componentDidMount() {
        // console.log('Burger Builder', this.props)
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => this.setState({error: true}))
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0)
        // this.setState({ purchasable: sum > 0 })
        return sum > 0
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true });
        }else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
    }
    
    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Cannot Load Ingredients</p>: <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded} //arg already passed in the BuildControls comp
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            )
                orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />
            // if (this.state.loading) {
            //     orderSummary = <Spinner />
            // }

        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) =>  dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }
// purchaseContinueHandler = () => {
//     // no longer want to store on firebase immediately but go to checkout instead

//     const queryParams = [];
//     for (let i in this.state.ingredients){
//         //properties' name = value
//         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
//     };
//     queryParams.push('price=' + this.state.totalPrice)
    
//     const queryString = queryParams.join('&');

//     this.props.history.push({
//         pathname: '/checkout',
//         search: '?' + queryString
//     });
// }
// updatePurchaseState(ingredients) {
//     const sum = Object.keys(ingredients)
//         .map(igKey => {
//             return ingredients[igKey];
//         }).reduce((sum, el) => {
//             return sum + el;
//         }, 0)
//     this.setState({ purchasable: sum > 0 })
// }
// addIngredientHandler = (type) => {
//     const oldCount = this.state.ingredients[type];
//     const updatedCounted = oldCount + 1;
//     const updatedIngredients = {
//         ...this.state.ingredients
//     };
//     updatedIngredients[type] = updatedCounted
//     const priceAddition = INGREDIENT_PRICES[type]
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice + priceAddition;
//     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
//     this.updatePurchaseState(updatedIngredients);
// }

// removeIngredientHandler = (type) => {
//     const oldCount = this.state.ingredients[type];
//     if (oldCount <= 0) {
//         return;
//     }

//     const updatedCounted = oldCount - 1;
//     const updatedIngredients = {
//         ...this.state.ingredients
//     };
//     updatedIngredients[type] = updatedCounted
//     const priceDeduction = INGREDIENT_PRICES[type]
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice - priceDeduction;
//     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
//     this.updatePurchaseState(updatedIngredients);
// }
