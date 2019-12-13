import React, {Component} from 'react';
import Button from "../../components/UI/Button/Button";
import classes from './ContactData.css'
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.price,
            customer: {
                name: 'seungwoo',
                address: {
                    street: 'teststrr',
                    zipCode: '413rrrrrrrr51',
                    country: 'korea'
                },
                email: 'test@ddd.com'
            },
            deliveryMethod: 'faestest'
        }
        axios.post('/orders.json', order)
            .then(res=> {
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }


    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                <input className={classes.Input} type="text" name="street" placeholder="street" />
                <input className={classes.Input} type="text" name="postal" placeholder="postal" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>

        );
    }
}

export default ContactData;
