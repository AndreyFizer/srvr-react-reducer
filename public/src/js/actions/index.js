import axios from 'axios';
import {SIGN_IN, AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, FETCH_USERS} from 'actions/types';
import {hashHistory} from 'react-router';

export function userSignin({email, password}) {
    return function(dispatch) {
        axios.post('/signin', {email, password})
            .then(response => {
                
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                hashHistory.push('/feature');
                
            })
            .catch(() => {
                
                dispatch(authError('Bad credentials...'));
            })
    }
}

export function signupUser({email, password}) {
    return function(dispatch) {
        axios.post('/signup', {email, password})
            .then(response => {
                
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                hashHistory.push('/feature');
                
            })
            .catch(response => {
                dispatch(authError(response.data.error));
            })
    }
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get('/message', {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {
                dispatch({
                    type   : FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
    }
}

export function fetchUsers() {
    return function(dispatch) {
        axios.get('/users', {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {
                dispatch({
                    type   : FETCH_USERS,
                    payload: response.data.users
                })
            })
    }
}

export function authError(err) {
    return {
        type   : AUTH_ERROR,
        payload: err
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    
    return {
        type: UNAUTH_USER
    }
}
