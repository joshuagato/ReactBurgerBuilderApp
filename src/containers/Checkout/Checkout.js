import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/ChekoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export class Checkout extends Component {

    state = {
        // ingredients: {
        //     salad: 0,
        //     meat: 0,
        //     cheese: 0,
        //     bacon: 0
        // },

        // ingredients: null,
        // price: 0
    }

    // we changed from ...DidMount to ...WillMount so as to run before rendering child components 
    // componentDidMount() {
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;

    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //         if(param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         } 
            
    //     }
    //     this.setState({ingredients: ingredients, price: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings} 
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler} />
                    {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */}
                    {/* <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData price={this.state.price} ingredients={this.state.ingredients} {...props} />)} /> */}
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);

// due to the way we load the ContactData component by rendering it manually, we dont have the history Object available in there
// we can solve this in one of two ways: 1. by wrapping the ContactData component with the withRouter Object
// 2. by passing and spreading props on the Route for the ContactData component