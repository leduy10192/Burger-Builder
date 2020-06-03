import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        //dummy data, pass ingredients later
        ingredients: null,
        totalPrice: 0
    }

    UNSAFE_componentWillMount () {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        let price = 0
        for (let param of query.entries()) {
            //each entry format: ['salad','1']
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]]= +param[1]; //convert to number by adding +
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinueHandler}
                />
                {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} */}
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} />
                />
            </div>
        )
    }
}

export default Checkout;
