import React, {Component} from 'react';
import * as actions from 'actions/index';
import {reduxForm} from 'redux-form';

class Signup extends Component {
    
    handleFormSubmit({email, password}) {
        console.log(`${email} ${password}`);
    }
    
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>Ooops, {this.props.errorMessage})</div>
            )
        }
    }
    
    render() {
        const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset>
                    <label>Email</label>
                    <input {...email} />
                    {email.touched && email.error && <div>{email.error}</div>}
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <input {...password} type="password"/>
                    {password.touched && password.error && <div>{password.error}</div>}
                </fieldset>
                <fieldset>
                    <label>Password confirm</label>
                    <input {...passwordConfirm} type="password"/>
                    {passwordConfirm.touched && passwordConfirm.error && <div>{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert.bind(this)}
                <button className="btn" type="submit">Sign up</button>
            </form>
        )
    }
}

function validate({email, password, passwordConfirm}) {
    const errors = {};
    
    if (!email) {
        errors.email = 'Email is requre field...';
    }
    
    if (!password) {
        errors.password = 'Password is requre field...';
    }
    
    if (password !== passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match...';
    }
    
    return errors;
}

const mapStateToProps = (state) => ({
    errorMessage: state.auth.error
});

const formOpts = {
    form  : 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
};

export default reduxForm(formOpts, mapStateToProps, actions)(Signup)
