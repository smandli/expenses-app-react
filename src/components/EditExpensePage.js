import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses'

const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm
                expense={props.expense}
                onSubmit={(expense) => {
                    props.dispatch(startEditExpense(props.expense.id, expense)).then(() => {
                        props.history.push('/');
                    });
                }}>
            </ExpenseForm>

            <button onClick={() => { 
                props.dispatch(startRemoveExpense( props.expense.id ));
                props.history.push('/');
            }}
            >
                Remove
            </button>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

// const mapDispatchToProps = (dispatch, props) => {
//     editExpense: (id, expense) => dispatch(editExpense(id, expense));
//     removeExpense: (data) => dispatch(removeExpense(data))
// };

export default connect (mapStateToProps)(EditExpensePage);