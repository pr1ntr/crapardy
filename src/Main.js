import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import Players from './components/Players'
import Board from './components/Board'
import Info from './components/Info'


class Main extends Component {

    static propTypes = {
        basename: PropTypes.string,
        hideSnackbar: PropTypes.func,
        menuOpen: PropTypes.bool,
        setMenuOpen: PropTypes.func,
        createConnection: PropTypes.func,
        snackbar: PropTypes.object,
    }

    static defaultProps = {
        basename: '/',
    }

    render() {
        return <div>
            <Players />
            <Info />
            <Board />
        </div>
    }
}

export default compose()(Main)
