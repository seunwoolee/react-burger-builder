import React, {Component} from 'react'

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxx/Auxx";


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props) {
            super(props);
            console.log('[withErrorHandler constructor]')
            axios.interceptors.request.use(req => {
                console.log('[withErrorHandler] request')
                this.setState({error: null})
                return req
            })

            axios.interceptors.response.use(res=>res, error => {
                console.log('[withErrorHandler] response')
                this.setState({error:error})
            })
        }

        state = {
            error: null
        }

        // componentDidMount() {
        //     console.log('[withErrorHandler componentDidMount]')
        //     axios.interceptors.request.use(req => {
        //         console.log('[withErrorHandler] request')
        //         this.setState({error: null})
        //         return req
        //     })
        //
        //     axios.interceptors.response.use(res=>res, error => {
        //         console.log('[withErrorHandler] response')
        //         this.setState({error:error})
        //     })
        // }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null }
                        Somting didn't work!
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
