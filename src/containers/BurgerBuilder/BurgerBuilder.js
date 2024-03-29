import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxil from '../../hoc/Auxil/Auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

// console.log(INGREDIENT_PRICES.meat);
// console.log(INGREDIENT_PRICES['meat']);

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // the ingredients node has to be created on firebase

        // axios.get('https://jgato-react-burger-builder-app.firebaseio.com/ingredients.json').then(response => {
        
        // axios.get('/ingredients.json').then(response => {
        //     this.setState({ ingredients: response.data });
        // }).catch(error => {
        //     this.setState({ error: true });
        // });
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients).map((igKey) => {
           return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        // this.setState({purchasable: sum > 0});
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];

    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );

    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];

    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );

    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState( {purchasing: true} );
    }

    purchaseCancelHandler = () =>  {
        this.setState( {purchasing: false} );
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        
        // former place for executing the axios post request

        // this.props.history.push('/checkout');
        // const queryParams = [];
        // for(let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString  = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            // ...this.state.ingredients
            ...this.props.ings
        };
        // console.log(disabledInfo);

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
            // console.log(disabledInfo[key] = disabledInfo[key] <= 0);
            // console.log(disabledInfo[key]);
        }
        // console.log(disabledInfo);
        
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        // if(this.state.ingredients) {
        if(this.props.ings) {
            burger = (
                <Auxil>
                    {/* <Burger ingredients={this.state.ingredients} /> */}
                    <Burger ingredients={this.props.ings} />
                    {/* <BuildControls 
                        ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} /> */}
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo} price={this.props.price} purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Auxil>
            );

            // orderSummary = <OrderSummary ingredients={this.state.ingredients} purchaseCancelled={this.purchaseCancelHandler} 
            //                             purchaseContinued={this.purchaseContinueHandler} price={this.state.totalPrice} />;
            orderSummary = <OrderSummary ingredients={this.props.ings} purchaseCancelled={this.purchaseCancelHandler} 
                                        purchaseContinued={this.purchaseContinueHandler} price={this.props.price} />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxil>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxil>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler( BurgerBuilder, axios ));