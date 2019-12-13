import React from 'react'
import {withRouter} from "react-router-dom";
import classes from './Burger.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />

            })
        })
        .reduce((arr, ele) => {
            return arr.concat(ele)
        }, [])

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingreidents!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default withRouter(burger)
