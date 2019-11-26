import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxil from '../Auxil/Auxil';

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        // componentDidMount() {
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req; //so that the reqest can continue
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error }); //seeting the error state to the error we're getting froom firebase
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxil>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxil>
            );
        }
    }
}

export default WithErrorHandler;