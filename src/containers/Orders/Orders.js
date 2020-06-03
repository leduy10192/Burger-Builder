import React, { Component } from 'react'
import axios from '../../axios-order'

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true // spinner run when page loads
    }
    //fetch order when the component mounts
    componentDidMount () {
        axios.get('/orders.json') // if we delete json, then UI will show network Error
            .then( res => {
                console.log(res.data)
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients = {order.ingredients}
                        price = {+order.price} //convert to number
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);