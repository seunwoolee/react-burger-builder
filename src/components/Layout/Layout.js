import React from 'react'

import Aux from '../../hoc/Auxx'
import classes from './Layout.css'
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={classes.Content}>
            {props.childern}
        </main>
    </Aux>
);

export default layout;
