
import { ADD_PLAYER, REMOVE_PLAYER, ADD_POINTS, NEW_GAME, REMOVE_POINTS } from '../constants/app'

const defaultPlayer = (name) => ({
    id: Math.floor(Math.random() * 1000000),
    name: name,
    score: 0,
    answered: [],
})

const initialState = {
    list: []
}


export default function(state = initialState, { type, payload }) {
    let playerIndex
    switch(type) {
        case ADD_PLAYER :
            return {
                ...state,
                list: [
                    ...state.list,
                    defaultPlayer(payload.name),
                ]
            }
        case REMOVE_PLAYER :
            playerIndex = state.list.findIndex(p => p.id === payload.id)

            return {
                ...state,
                list: [
                    ...state.list.slice(0, playerIndex),
                    ...state.list.slice(playerIndex + 1, state.list.length),
                ]
            }
        case ADD_POINTS : case REMOVE_POINTS :
            return {
                ...state,
                list: [
                    ...state.list.map(p => {
                        let score = p.score
                        let answered = p.answered
                        if(p.id === payload.id) {
                            score = score + ( type === ADD_POINTS ? payload.points : -payload.points )
                            answered = [...p.answered, payload.clueId]
                        }
                        return {
                            ...p,
                            answered,
                            score
                        }
                    })
                ]
            }

        case NEW_GAME :
            return {
                ...state,
                list: [
                    ...state.list.map(p => ({ ...p, score: 0, answered: [] }))
                ]
            }
        default :
            return state

    }
}