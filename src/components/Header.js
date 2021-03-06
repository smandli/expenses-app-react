import React from 'react';
import { Switch, BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ( {startLogout} ) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Expenses App</h1>
                </Link>
                <button onClick={startLogout} className="button button--link">Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect (undefined, mapDispatchToProps)(Header);