
import { RETURN_CATEGORIES, RETURN_CLUE, REQUEST_ERROR, NEW_GAME, COMPLETE_ROUND } from '../constants/app'


const initialState = {
    categories: [],
    clues: [],
    error: null,
    isNewGame: true
}


export default function(state = initialState, { type, payload }) {
    switch(type) {
        case RETURN_CLUE :

            console.log(payload)

            return {
                ...state,
                clues: [
                    ...state.clues.map((clue) => ({ ...clue, current: false })),
                    {...payload.clue, current: true }
                ]
            }
        case RETURN_CATEGORIES :
            return {
                ...state,
                categories: payload.categories,
                isNewGame: false,
            }

        case REQUEST_ERROR :
            return {
                ...state,
                error: payload.error
            }
        case COMPLETE_ROUND :
            return {
                ...state,
                clues: [
                    ...state.clues.map(c => {

                        if(c.current) {
                            let current = !c.current
                            let answered = !!c.current
                            return {
                                ...c,
                                answered,
                                current
                            }
                        }
                        return { ...c }
                    })
                ]
            }
        case NEW_GAME:
            return {
                ...state,
                categories: [],
                clues: [],
                isNewGame: true
            }
        default :
            return state

    }
}