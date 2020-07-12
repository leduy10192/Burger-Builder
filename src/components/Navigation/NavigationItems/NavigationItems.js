import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    // console.log('Checkout', props)
    return(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">Authenticate</NavigationItem>
    </ul>
    )
};

export default navigationItems;