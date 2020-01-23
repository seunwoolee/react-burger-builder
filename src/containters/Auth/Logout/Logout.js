import React, { Component} from 'react'
import {Redirect} from "react-router";
import * as actions from '../../../store/actions/index'
import {connect} from "react-redux";

class Logout extends Component{
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to='/'/>;
    }
}

// const mapStateToProps = state => {
//     return {
//         loading: state.auth.loading,
//         error: state.auth.error
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
};

export default connect(null, mapDispatchToProps)(Logout)
