import React, { Component } from 'react';

import Auxil from '../Auxil/Auxil';
import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState( {showSideDrawer: false} );
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        } );
    }

    render() {
        return (
            <Auxil>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler} />
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </Auxil>
        );
    }
}

export default Layout;