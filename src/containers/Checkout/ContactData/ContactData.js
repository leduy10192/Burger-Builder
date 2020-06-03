import React, { Component } from 'react'
import axios from "../../../axios-order"
import Button from '../../../components/UI/Button/Button';
import classes from "./ContactData.module.css";
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    componentDidMount () {
        console.log("ContactData", this.props)
    }
    orderHandler = (event) => {
        //to prevent form default behavior which is to sent the request and reload the page
        event.preventDefault();

        //Copy codes from BurgerBuilder purchaseContinueHandler
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            //real-app: recalculate the price on the server
            price: this.props.price,
            customer: {
                name: 'Duy Le',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '94111',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'express'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/') 
            })
            .catch(error => this.setState({ loading: false }));

    }

    render () {
        let form = ( 
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your email" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Postal" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>)
        if(this.state.loading){
            form = <Spinner /> //Add spinner
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData