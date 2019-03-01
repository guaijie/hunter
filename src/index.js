import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import  App from './App.js'
import {Provider} from 'react-redux'



import combineReducers from './reducers/reducer.js'
import { createStore,compose,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// import { composeWithDevTools } from 'remote-redux-devtools';

let devToolsExtension=window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__():'';

const store=createStore(combineReducers,compose(applyMiddleware(thunk),devToolsExtension));


// ReactDOM.render(<MainRouter store={store} />, document.getElementById('root'));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
