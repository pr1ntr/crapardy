import { GET_CATEGORIES, GET_CLUE, NEW_GAME, SUBMIT_ANSWER, PASS_ANSWER } from '../constants/app'

export const getCategories = () => {
    return { type: GET_CATEGORIES }
}

export const getClue = (category, value) => {
    return { type: GET_CLUE, payload: { category, value } }
}


export const newGame = () => {
    return { type: NEW_GAME }
}


export const submitAnswer = (playerId, value, clueId) => {
    return { type: SUBMIT_ANSWER, payload: { playerId, value, clueId } }
}

export const passAnswer = (playerId, clueId) => {
    return { type: PASS_ANSWER, payload: { playerId, clueId }  }
}