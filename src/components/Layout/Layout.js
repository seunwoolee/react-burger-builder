import React from 'react'

import Aux from '../../hoc/Auxx'
import classes from './Layout.css'

const layout = (props) => (
    <Aux>
        <div>Toolbar, sideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.childern}
        </main>
    </Aux>
);

export default layout;
