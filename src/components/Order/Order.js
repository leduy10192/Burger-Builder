import React from 'react'
import classes from './Order.module.css';

const order = (props) => {
    //transform ingredients to an array of ingredients, can copy form Burger.js
    //alternative using for in
    const ingredients = [];

    for ( let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    console.log(props.ingredients)

    const ingredientOutput = ingredients.map( ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return(
    <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        {/* convert string to number and parse to 2 decimal places */}
        <p>Price: <strong> USD {Number.parseFloat(props.price.toFixed(2))}</strong></p> 
    </div>
)};

export default order;