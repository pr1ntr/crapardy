import React from 'react'
import PropTypes from 'prop-types'
import withJeopardy from './hoc/withJeopardy'
import withPlayers from './hoc/withPlayers'
import { compose, setPropTypes, withProps, setDisplayName } from 'recompose'

const Info = ({ currentClue, roundOver }) => {
    return <div className="info">
        <div className="info__info-container row col-xs-12">
            <div className="info-container__text col-xs-12 row center-xs middle-xs">
                {roundOver && !!currentClue &&
                    <div dangerouslySetInnerHTML={{__html: `The correct answer: <b>${currentClue.answer}</b>` }}></div>
                }

            </div>
        </div>
    </div>
}




export default compose(
    withJeopardy,
    withPlayers,
    withProps(({ clues }) => ({
        currentClue: clues.find(c => c.current)
    })),
    setDisplayName('Info'),
    setPropTypes({
        className: PropTypes.string,
        currentClue: PropTypes.object,
        roundOver: PropTypes.bool,
    }),
)(Info)
