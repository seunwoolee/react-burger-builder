import React from 'react'
import classes from './Order.css'
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const order = (props) => {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        console.log(ingredientName, props.ingredients[ingredientName])
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
    }

    const outputIngredients = ingredients.map(ingredient => {
        return (<span>{ingredient.name} : {ingredient.amount}</span>)
    })

    return (
        <div className={classes.Order}>
            {outputIngredients}
            {/*<p>Ingredients: {props.ingredients.bacon}</p>*/}
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order
