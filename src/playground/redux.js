import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ( description = '', note = '', amount = 0, createdAt = 0) => ({
    type: 'ADD_EXPENSE',
    expense : {
        id: uuid(),
        description: description,
        note: note,
        amount: amount,
        createdAt: createdAt
    }
});

const removeExpense = ( id ) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    updates: updates
});

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [
                ...state,
                action.expense
            ];
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else{
                    return expense;
                }
            });
        case "REMOVE_EXPENSE":
            return state.filter((expense) => expense.id !== action.id);
        default:
            return state;
    }
}

const filterReducerDefaultState = {
    text: '',
    sortby: '',
    startDate: undefined,
    endDate: undefined
}

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate : startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate : endDate
});

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortby: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortby: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}

var store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })
)

store.subscribe(() => {
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses, state.filters));
    //console.log(store.getState());
})

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    })
};

const rent = store.dispatch(addExpense('Rent1', 'asdasd', 100, 125));
const rent2 = store.dispatch(addExpense('Rent2', 'asdasd', 400, 50));

// const editAction = store.dispatch(editExpense(rent.expense.id, { description: 'updated value'}));
//store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(50));
// store.dispatch(setEndDate(60));