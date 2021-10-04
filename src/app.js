import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import AppRouter, { history } from './routers/AppRouter';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

let hasRenderedApp = false;
const RenderApp = () => {
    if (!hasRenderedApp)
    {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRenderedApp = true;
    }
}

ReactDOM.render("<p>Loading...</p>", document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            RenderApp();
            if (history.location.pathname === '/')
            {
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        RenderApp();
        history.push('/');
    }
});