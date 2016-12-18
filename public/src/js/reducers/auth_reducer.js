import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE} from 'actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            return Object.assign({}, state, {error: '', authenticated: true});
        case UNAUTH_USER:
            return Object.assign({}, state, {authenticated: false});
        case AUTH_ERROR:
            return Object.assign({}, state, {error: action.payload});
        case FETCH_MESSAGE:
            return Object.assign({}, state, {message: action.payload});
    }
    return state;
};
