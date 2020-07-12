import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from "../../../axios-order"
import Button from '../../../components/UI/Button/Button';
import classes from "./ContactData.module.css";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            //define how this input should look like so we can go through this object dynamically
            name: {
                elementType: 'input',
                elementConfig: { //the normal attributes we can set up for the chosen html tag
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                //set up rule
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }, 
            street: {
                elementType: 'input',
                elementConfig: { //the normal attributes we can set up for the chosen html tag
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: { //the normal attributes we can set up for the chosen html tag
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: { //the normal attributes we can set up for the chosen html tag
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: { //the normal attributes we can set up for the chosen html tag
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: { //the normal attributes we can set up for the chosen html tag
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false,
        // loading: false
    }

    checkValidity(value, rules) {
        //return true or false whether it is valid or not and inputChangedHandler adjust this valid prop too
        // add && isValid so isValid does not depend on only the last if statement
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid
    }
    componentDidMount() {
        console.log("ContactData", this.props)
    }
    orderHandler = (event) => {
        //to prevent form default behavior which is to sent the request and reload the page
        event.preventDefault();

        //Copy codes from BurgerBuilder purchaseContinueHandler
        // this.setState({ loading: true })
        //get form data from state, only { name: value }, no need for elementType and elementConfig
        const formData = {};
        for (let formElementIndentifier in this.state.orderForm){
            formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            //real-app: recalculate the price on the server
            price: this.props.price,
            orderData: formData
        }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false })
        //         this.props.history.push('/')
        //     })
        //     .catch(error => this.setState({ loading: false }));
        this.props.onOrderBurger(order)
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //change state immutably: create copy
        const updatedOrderForm = {
            ...this.state.orderForm //does not create a deep clone due to orderForm having nested objects
        }
        //clone it deeply
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] //have not cloned elementConfig as we're not changing it
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation); //check validity
        //when user touch the input
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        //looping through all elements to check if the form is Valid
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid; //drop-down valid is undefined
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render() {
        //turn orderForm into an array
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType="..." elementConfig="" value="" /> */}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        valueType ={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation} //only set for input with validation
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>)
        if (this.props.loading) {
            form = <Spinner /> //Add spinner
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));