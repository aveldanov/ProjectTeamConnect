import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Reducer from '../src/store/reducers/reducer'


const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

    }) : compose;



const enhancer = composeEnhancers(
  applyMiddleware(),
  // other store enhancers if any
);

const store = createStore(Reducer, enhancer);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


