import React, {Component} from 'react';
import * as actions from 'actions/index';
import {connect} from 'react-redux';

class Feature extends Component {
    componentWillMount() {
        this.props.fetchUsers();
    }
    
    renderUsers() {
        return this.props.users.map(usr => (
            <li key={usr._id}>
                <span>{usr.email}</span>
            </li>
        ))
    }
    
    render() {
        return (
            <div>
                <h4>Secret info:</h4>
                <ul>
                    {this.renderUsers()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users.userList
});

export default connect(mapStateToProps, actions)(Feature);
