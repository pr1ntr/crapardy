import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore  } from 'redux-persist'

import thunk from 'redux-thunk'

import rootReducer from '../reducers'
import { root } from '../sagas'



const sagaMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)


export default function configureStore() {

    const store = createStoreWithMiddleware(rootReducer)
    const persistor = persistStore(store)

    // eslint-disable-next-line
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    sagaMiddleware.run(root)

    return { store , persistor }
}
