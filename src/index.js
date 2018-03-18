import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import './components/user_account/signup.css';
import { createStore, applyMiddleware } from 'redux';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import registerServiceWorker from './registerServiceWorker';
import allReducers from './reducers/root';


const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root')

);
registerServiceWorker();
