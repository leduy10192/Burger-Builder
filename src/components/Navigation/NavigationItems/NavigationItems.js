import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    // console.log('Checkout', props)
    return(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>BurgerBuilder</NavigationItem>
        <Link to='/checkout'>
            <NavigationItem link="/">Checkout</NavigationItem>
        </Link>
    </ul>
    )
};

export default navigationItems;