import React from 'react'
import classes from './Order.css'
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const order = (props) => {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
    }

    const outputIngredients = ingredients.map(ingredient => {
        return (<span>{ingredient.name} : {ingredient.amount}</span>)
    })

    return (
        <div className={classes.Order}>
            {outputIngredients}
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default order
