import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    // console.log('Checkout', props)
    return(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem>: null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
    )
};

export default navigationItems;