import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'


import Main from './Main'
import { Provider } from 'react-redux'
import createStore from './store'
import './App.css'

const container = document.querySelector('#root')
const { store, persistor } = createStore()


const start = (element) => ReactDOM.render(
    <Provider store={store}>
        <PersistGate
            loading={<div>...Wait For It</div>}
            persistor={persistor}
        >
            <Router>
                <Main />
            </Router>
        </PersistGate>
    </Provider>,
    element)

if(container && container instanceof HTMLElement) start(container)



