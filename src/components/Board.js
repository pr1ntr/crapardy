import React from 'react'
import PropTypes from 'prop-types'
import withJeopardy from './hoc/withJeopardy'
import withPlayers from './hoc/withPlayers'
import { compose, withHandlers, setPropTypes, lifecycle, withProps } from 'recompose'
import vector from '../utils/vector'
import cx from 'classnames'

const cluePropTypes = {
    value: PropTypes.number.isRequired,
    category: PropTypes.number.isRequired,
    clueData: PropTypes.object
}

const Clue = compose(
    setPropTypes(cluePropTypes),
    withJeopardy,
    withProps(({ clues }) => {
        return {
            roundComplete: !!!clues.find(c => c.current)
        }
    }),
    withHandlers({
        onRevealClue: ({ value, category, getClue, roundComplete })  => () => {
            if(roundComplete) {
                getClue(category, value)
            }
        }
    }))(
    ({ value, onRevealClue, clueData}) => {
    return <div className="clue-col__clue" onClick={!clueData ? onRevealClue : () => {}}>
        <div className="center-xs clue__value">
            {clueData ?
                <div className={cx('clue__text', { 'clue__text--Current': clueData.current })}>{clueData.question}</div>
                :
                <span>{value}</span>
            }
            </div>
    </div>
})

Clue.propTypes = cluePropTypes

const Board = ({ categories, clues }) => {
    return <div className="board col-xs-12 row">
        <div className="board__category-list row col-xs-12">
            {
                categories.map(c => <div key={c.id} className="category-list__category col-xs-2">
                    <div className="center-xs">{c.title}</div>
                </div>)
            }
        </div>
        <div className="board__clue-list row col-xs-12">
            {
                categories.map(c => {
                    return <div key={`${c.id}_clues`} className="clue-list__clue-col col-xs-2">
                        { vector(5).map((i) => {
                            const value = (i + 1) * 200
                            const clue = clues.find(clue => clue.value === value && clue.category_id === c.id)
                            return <Clue key={`${c.id}_clues_row_${i}`} value={value} category={c.id} clueData={clue}/>
                        } ) }

                    </div>
                })
            }
        </div>
    </div>
}

Board.propTypes = {
    className: PropTypes.string,
}

Board.defaultProps = {
    className: '',
}

export default compose(
    withJeopardy,
    lifecycle({
        componentWillMount() {
            const { getCategories, isNewGame } = this.props

            if(isNewGame) getCategories()
        },
        componentWillReceiveProps({ isNewGame: isNextNewGame }) {
            const { isNewGame, getCategories } = this.props
            if(isNextNewGame && !isNewGame) getCategories()
        }

    }),


)(Board)
