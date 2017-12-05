import { ADD_PLAYER, REMOVE_PLAYER } from '../constants/app'

export const addPlayer = (name) => {
    return { type: ADD_PLAYER, payload: { name } }
}

export const removePlayer = (id) => {
    return { type: REMOVE_PLAYER, payload: { id } }
}




