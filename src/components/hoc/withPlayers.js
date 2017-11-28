import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose, setPropTypes } from 'recompose'
import { addPlayer, removePlayer } from '../../actions/players'

export default (Component) => compose(
    connect(state => ({ players: { ...state.players } }), {  addPlayer, removePlayer } ),
    setPropTypes({
        addPlayer: PropTypes.func.isRequired,
        removePlayer: PropTypes.func.isRequired,
        players: PropTypes.shape({
            list: PropTypes.array.isRequired,
        })
    }),
)(Component)
