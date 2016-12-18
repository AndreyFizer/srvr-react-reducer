import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from 'actions/index';

class Signin extends Component {
    handleFormSubmit(props) {
        this.props.userSignin({email: props.email, password: props.password});
    }
    
    renderError() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <strong>{this.props.errorMessage}</strong>
                </div>
            )
        }
    }
    
    render() {
        const {fields: {password, email}, handleSubmit} = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset>
                    <label>Email</label>
                    <input {...email} />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <input {...password} type="password"/>
                </fieldset>
                {this.renderError()}
                <button className="btn" type="submit">Sign in</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.error
    }
};

const formContent = {
    form  : 'signIn',
    fields: ['email', 'password']
};

export default reduxForm(formContent, mapStateToProps, actions)(Signin);
