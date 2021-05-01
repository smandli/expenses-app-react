import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import configureStore from './store/configureStore'
import { addExpense, startSetExpenses } from './actions/expenses'
import AppRouter from './routers/AppRouter';
import { sortByDate } from './actions/filters';
import moment from 'moment';
import './firebase/firebase'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render("<p>Loading...</p>", document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));    
});

//store.subscribe(() => console.log(store.getState()));

// store.dispatch(addExpense({ description: 'Rent',  note: 'Rent', amount: 1000, createdAt: moment().valueOf()}));
// store.dispatch(addExpense({ description: 'Water',  note: 'Water', amount: 200, createdAt: moment().valueOf()}));
// store.dispatch(addExpense('Water', 'Water bill', 2343, 125));
// store.dispatch(addExpense('Gas bill', 'Gas', 120, 30));
// store.dispatch(sortByDate());