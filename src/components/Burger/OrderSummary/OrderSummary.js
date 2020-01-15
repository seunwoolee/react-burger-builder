import React, {Component} from 'react'
import Aux from "../../../hoc/Auxx/Auxx";
import Button from "../../UI/Button/Button";


class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return(
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>)
            })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>a delicious burger with the following ingre:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>continue to check?</p>
                <Button
                    clicked={this.props.purchaseCancled}
                    btnType="Danger">CANCEL</Button>
                <Button
                    clicked={this.props.purchaseContinue}
                    btnType="Success">CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary
