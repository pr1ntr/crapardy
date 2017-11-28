import players from './players'
import jeopardy from './jeopardy'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'


const config = {
    key: 'root',
    storage,
}

const rootReducer = persistCombineReducers(config, {
    players,
    jeopardy,
})

export default rootReducer
