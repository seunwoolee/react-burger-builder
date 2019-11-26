import React from 'react'
import Logo from "../../LOGO/logo";
import classes from './Toolbar.css'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo/>
        <nav>
            ...
        </nav>
    </header>

)

export default toolbar
