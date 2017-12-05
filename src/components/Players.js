import React from 'react'
import PropTypes from 'prop-types'
import withPlayers from './hoc/withPlayers'
import withJeopardy from './hoc/withJeopardy'
import { compose, withHandlers, setPropTypes, withProps } from 'recompose'




const Player = compose(
    withJeopardy,
    withPlayers,
    withProps(({ clues }) => {
        const currentClue = clues.find(c => c.current)

        return {
            currentClue,
        }
    }),
    withHandlers({
        onRemovePlayer: ({ removePlayer, id }) => () => {
            removePlayer(id)
        },
        onSubmitAnswer: ({ submitAnswer, id, currentClue }) => () => {
            const value = document.getElementById(`playerSubmit[${id}]`).value
            submitAnswer(id, value, currentClue)

        },
        onPassAnswer: ({ passAnswer, id, currentClue  }) => () => {
            passAnswer(id, currentClue)
        }
    }),
    setPropTypes({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        onRemovePlayer: PropTypes.func.isRequired,
        removePlayer: PropTypes.func.isRequired,
        onSubmitAnswer: PropTypes.func.isRequired,
        submitAnswer: PropTypes.func.isRequired,
        onPassAnswer: PropTypes.func.isRequired,
        answered: PropTypes.array.isRequired,

    }),
)(({ id, name, score, onRemovePlayer, onSubmitAnswer, answered, currentClue, onPassAnswer }) => {
    return <div className="player-list__player col-xs">
        {!answered.includes(currentClue) && !!currentClue && <div className="player__submit row center-xs">
            <input type="text" id={`playerSubmit[${id}]`}/>
            <button onClick={onSubmitAnswer} >Submit</button>
            <button onClick={onPassAnswer} >Pass</button>
        </div>}

        <div className="player__name">{name}</div>
        <div className="player__score">{score}</div>
        <div className="player__remove" onClick={onRemovePlayer}><i className="fa fa-times"></i></div>
    </div>
})


const Players = ({ players: { list }, onAddPlayer, newGame }) => {
    return <div className="players row col-xs-12 center-xs">
        <div className="players__add-player row">
            <div className="add-player__form row">
                <input type="text" id="addPlayerInputName"/>
                <button onClick={onAddPlayer} >Add Player</button>
                <button onClick={newGame} >New Game</button>

            </div>

        </div>
        <div className="players__player-list row col-xs-12 center-xs">
            {
                list.map(p => <Player key={p.id} {...p} />)
            }
        </div>

    </div>
}

Players.propTypes = {
    className: PropTypes.string,
}

Players.defaultProps = {
    className: '',
}

export default compose(
    withPlayers,
    withJeopardy,
    withHandlers({
        onAddPlayer: ({ addPlayer }) => () => {
            const nameInput = document.getElementById('addPlayerInputName')
            const name = nameInput.value
            addPlayer(name)
        }
    }),
)(Players)
