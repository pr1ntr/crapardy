import { compareTwoStrings } from 'string-similarity'
import { takeEvery, call, put, select } from 'redux-saga/effects'
import {
    GET_CATEGORIES, JSERVICE, REQUEST_ERROR, RETURN_CATEGORIES, GET_CLUE, RETURN_CLUE, SUBMIT_ANSWER,
    APPLICATION_ERROR, ADD_POINTS, REMOVE_POINTS, COMPLETE_ROUND
} from '../constants/app'
import { get } from '../utils/net'
import qs from 'qs'

export function* root() {
    yield takeEvery(GET_CATEGORIES, getCategories)
    yield takeEvery(GET_CLUE, getClue)
    yield takeEvery(SUBMIT_ANSWER, submitAnswer)


}




export function* submitAnswer({ payload: { playerId, value, clueId } }) {
    try {
        let { jeopardy: { clues } } = yield select()

        let currentClue = clues.find(clue => clue.current)
        if(currentClue) {

            let answer = currentClue.answer.replace(/^(an\s+|the\s+|a\s+)|-|(<([^>]+)>)/gi, '').trim()
            let userAnswer = value.replace(/^(what is|where is|who is|who are|an\s+|the\s+|a\s+)/gi, '').trim()

            const answerTolerance = compareTwoStrings(answer, userAnswer)
            if(answerTolerance > .80) {
                yield put({ type: ADD_POINTS, payload: { id: playerId, points: currentClue.value, clueId }})
                yield put({ type: COMPLETE_ROUND })
            }else {
                yield put({ type: REMOVE_POINTS, payload: { id: playerId, points: currentClue.value, clueId }})
                let { players: { list: players} } = yield select()
                if(players.filter(p => p.answered.includes(clueId)).length === players.length) {

                    yield put({ type: COMPLETE_ROUND })
                }
            }

            console.info('[answerSubmitted]', `currentClue.answer: ${answer}, value ${userAnswer}, answerTolerance ${answerTolerance}`)

        }

    } catch(error) {
        yield put({ type: APPLICATION_ERROR, payload: { error } })

    }
}




export function* getCategories() {
    try {

        let categories = yield call(get, JSERVICE.CATEGORIES + qs.stringify({ count: 1000 }, { addQueryPrefix: true }))
        categories.sort(() => .5 - Math.random())
        categories = categories.slice(0,6)

        yield put({ type: RETURN_CATEGORIES, payload: { categories } })

    } catch(error) {
        yield put({ type: REQUEST_ERROR, payload: { error } })

    }
}

export function* getClue({ payload: { category, value }}) {
    try {
        let clues = yield call(get, JSERVICE.CLUES + qs.stringify({ category, value }, { addQueryPrefix: true } ))
        clues.sort(() => .5 - Math.random())
        const clue = clues[0]
        if(clue) yield put({ type: RETURN_CLUE, payload: { clue } })
        else throw new Error('Service Returned No Clue')

    } catch(error) {
        yield put({ type: REQUEST_ERROR, payload: { error } })

    }
}