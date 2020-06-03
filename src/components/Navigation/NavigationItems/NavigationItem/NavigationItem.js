import React from 'react';
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact = {props.exact}
            activeClassName = {classes.active} //this will be our active class name as our css module class name
            // className={props.active ? classes.active : null} : class name is auto determined by NavLink
            >{props.children}
        </NavLink>
    </li>
);

export default navigationItem;