import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, hashHistory} from 'react-router';
import routes from './routes';
import reduxThunk from 'redux-thunk';
import reducers from 'reducers/index';
import {AUTH_USER} from 'actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

if (localStorage.getItem('token')) {
    store.dispatch({type: AUTH_USER});
}


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}/>
    </Provider>,
    document.querySelector('#wrapper')
);
