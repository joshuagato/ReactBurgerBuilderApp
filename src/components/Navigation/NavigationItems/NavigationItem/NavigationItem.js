import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (

    <li className={classes.NavigationItem}>
        {/* <a href={props.link} className={props.active ? classes.active : null}>{props.children}</a> */}
        <NavLink to={props.link} activeClassName={classes.active} exact>{props.children}</NavLink>
    </li>
);

export default navigationItem;