import React, {Component} from 'react';
import * as actions from 'actions/index';
import {connect} from 'react-redux';

class Feature extends Component {
    componentWillMount() {
        this.props.fetchMessage();
    }
    
    render() {
        return (
            <div>
                <h4>Secret info:</h4>
                <div>{this.props.message}</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    message: state.auth.message
});

export default connect(mapStateToProps, actions)(Feature);
