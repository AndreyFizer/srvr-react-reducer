import {FETCH_USERS} from 'actions/types';

const INITIAL_STATE = {userList: []};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_USERS:
            return Object.assign({}, state, {userList: action.payload});
        default:
            return state;
    }
}
