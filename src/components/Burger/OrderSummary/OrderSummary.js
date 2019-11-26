import React from 'react'
import Aux from "../../../hoc/Auxx";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return(
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>)
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>a delicious burger with the following ingre:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>continue to check?</p>
            <Button
                clicked={props.purchaseCancled}
                btnType="Danger">CANCEL</Button>
            <Button
                clicked={props.purchaseContinue}
                btnType="Success">CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary
