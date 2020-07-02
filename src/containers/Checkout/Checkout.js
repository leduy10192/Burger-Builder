import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// import * as actions from '../../store/actions/index';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinueHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            );
        }
            return (
                <div>
                    {summary}
                    {/* <Route 
                path={this.props.match.path + '/contact-data'}
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} />  */}
                </div>
            )
        }
    }

    const mapStateToProps = state => {
        return {
            ings: state.burgerBuilder.ingredients,
            purchased: state.order.purchased
        }
    };

    export default connect(mapStateToProps)(Checkout);

// state = {
//     //dummy data, pass ingredients later
//     ingredients: null,
//     totalPrice: 0
// }

// UNSAFE_componentWillMount () {
//     const query = new URLSearchParams(this.props.location.search)
//     const ingredients = {};
//     let price = 0
//     for (let param of query.entries()) {
//         //each entry format: ['salad','1']
//         if(param[0] === 'price'){
//             price = param[1];
//         }else{
//             ingredients[param[0]]= +param[1]; //convert to number by adding +
//         }
//     }
//     this.setState({ingredients: ingredients, totalPrice: price})
// }