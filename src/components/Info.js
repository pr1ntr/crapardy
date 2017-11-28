import React from 'react'
import PropTypes from 'prop-types'
import withJeopardy from './hoc/withJeopardy'
import withPlayers from './hoc/withPlayers'
import { compose, setPropTypes, defaultProps, setDisplayName } from 'recompose'

const Info = ({}) => {
    return <div className="info">
        <div className="info__info-container row col-xs-12">

        </div>

    </div>
}




export default compose(
    withJeopardy,
    withPlayers,
    setDisplayName('Info'),
    setPropTypes({
        className: PropTypes.string,
    }),
)(Info)
