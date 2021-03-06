import React from 'react'

import classes from './BurgerControls.css'
import BuildControl from './BurgerControl/BurgerControl'

const  controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: {props.price.toFixed(2)}</p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                type={ctrl.type}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
            )
        )}
        <button
            className={classes.OrderButton}
            disabled={!props.purchaseable}
            onClick={()=>props.ordered(true)}
        >{props.isAuth ? 'ORDER NOW' : 'You need SignUp'}</button>
    </div>
)

export default buildControls
