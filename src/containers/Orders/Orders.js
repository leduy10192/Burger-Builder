import React, { Component } from 'react'
import axios from '../../axios-order'
import { connect } from "react-redux";

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../store/actions"; //can omit index
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    //Get rid of local state to use redux instead
    // state = {
    //     orders: [],
    //     loading: true // spinner run when page loads
    // }
    //fetch order when the component mounts
    componentDidMount () {
        this.props.onFetchOrders();
        // axios.get('/orders.json') // if we delete json, then UI will show network Error
        //     .then( res => {
        //         console.log(res.data)
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders})
        //     })
        //     .catch(err => {
        //         this.setState({loading: false})
        //     })
    }

    render () {
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients = {order.ingredients}
                    price = {+order.price} //convert to number
                />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () =>  dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));