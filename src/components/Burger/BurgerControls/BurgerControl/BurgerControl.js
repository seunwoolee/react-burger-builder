import React from 'react'

import classes from './BurgerControl.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <p>Current Price:{props.price}</p>

        <div className={classes.Label}>{props.label}</div>
        <button
            onClick={props.removed}
            className={classes.Less}
            disabled={props.disabled} >Less</button>
        <button
            onClick={props.added}
            className={classes.More}>More</button>
    </div>
)

export default buildControl
