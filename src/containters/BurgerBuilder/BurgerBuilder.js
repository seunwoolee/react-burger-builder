import React, {Component} from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxx/Auxx'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index'

import {swRegistration} from '../../registerServiceWorker'

class BurgerBuilder extends Component {

    state = {
        purchaseing: false,
        installButton: null,
        isSubscribed: false
    };

    installPrompt = null;

    componentDidMount(){
        window.addEventListener('beforeinstallprompt',e=>{
            e.preventDefault();
            console.log("Install Prompt fired");
            this.installPrompt = e;
            // See if the app is already installed, in that case, do nothing
            if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true){
                return false;
            }
            // Set the state variable to make button visible
            this.setState({
                installButton:true
            })
        });

        this.props.onInitIngredients()

    }

    installApp = async () => {
        console.log(this.installPrompt);
        if(!this.installPrompt) return false;
        this.installPrompt.prompt();

        let outcome = await this.installPrompt.userChoice;
        if(outcome.outcome ==='accepted'){
            console.log("App Installed")
        }
        else {
            console.log("App not installed");
        }
        // Remove the event reference
        this.installPrompt=null;
        // Hide the button
        this.setState({
            installButton:false
        })
    };

    checkSubscribe = () => {
        return swRegistration.pushManager.getSubscription()
            .then((subscription) => {
                if(subscription){
                    this.setState({isSubscribed: true});
                }

                if (this.state.isSubscribed) {
                    console.log('User IS subscribed.', subscription);
                } else {
                    console.log('User is NOT subscribed.');
                }
            });
    };

    displayConfirmNotification = () => {
        if('serviceWorker' in navigator) {
            const options = {
                body: '이승우짱',
                icon: '/favicon_192.png',
                actions: [
                    {action: 'confirm', title: '확인', icon: '/favicon_192.png'},
                    {action: 'cancel', title: '취소', icon: '/favicon_192.png'}
                ]
            };
            navigator.serviceWorker.ready
                .then(swreg => {
                swreg.showNotification('서비스워커에서 Notification 실행', options);
            })
        }
    };

    askForNotificationPermission = () => {
        Notification.requestPermission(result => {
            console.log('User chocie', result);
            if(result !== 'granted') {
                console.log('No notification permission granted');
            } else {
                this.checkSubscribe()
                    .then(() => !this.state.isSubscribed ? this.setPushSubscribe() : null);
                this.displayConfirmNotification();
            }
        })
    };

    setPushSubscribe = () => {
        console.log('구독진행');
        const applicationServerPublicKey = 'BBvGTYHuHHla8VcJjlLFyFpBM6iU-uaSqw5Afqgi_EkB9ctCvMRMKThD4_VJj8j9XZh8QdZf9O9HSjPcjc6jIZE';
        const applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey);
        if(!('serviceWorker' in navigator)){
            return;
        }
        swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
        .then(subscription => {
            this.updateSubscriptionOnServer(subscription)
        })
    };

    updateSubscriptionOnServer(subscription){
        // TODO: Send subscription to application server
        console.log('User is subscribed:', subscription.toJSON());
    }


    urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    updatePruchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchaseing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchaseing: false})
    };

    purchaseContinueHandler = (state) => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePruchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price}
                    />
                    <button onClick={this.installApp}>Install App</button>
                    <button onClick={this.askForNotificationPermission}>Notification 구독</button>

                </Aux>
            );

            orderSummary = <OrderSummary
            price={this.props.price}
            purchaseCancled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.props.ings}/>

        }


        return (
            <Aux>
                {/* the wrapping element controls the updating of the wrapped element*/}
                <Modal show={this.state.purchaseing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngreient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngreient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
