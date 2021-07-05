import React from 'react';

import Navigation from './Navigation/Navigation';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import BooksBasket from './Reducers/booksbasket.reducer';

var globalReducers = combineReducers({
    BooksBasket
});

const store = createStore(globalReducers);

const App = () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
};

export default App;
