import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose, setPropTypes, withHandlers } from 'recompose'
import { getCategories, getClue, newGame, submitAnswer, passAnswer } from '../../actions/jeopardy'

export default (Component) => compose(
    connect(state => ({ ...state.jeopardy  }), { getCategories, getClue, newGame, submitAnswer, passAnswer } ),

    withHandlers(),
    setPropTypes({
        getCategories: PropTypes.func.isRequired,
        getClue: PropTypes.func.isRequired,
        submitAnswer: PropTypes.func.isRequired,
        newGame: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        clues: PropTypes.array.isRequired,
        isNewGame: PropTypes.bool,
        error: PropTypes.object,
        round: PropTypes.number,
        roundOver: PropTypes.bool,
    }),
)(Component)
