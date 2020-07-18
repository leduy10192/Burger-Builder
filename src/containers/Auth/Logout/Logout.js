import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount(){
        this.props.onLogout();
    }
    render() {
        //Whenever this component loaded, it'd redirect immediately
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps) (Logout);