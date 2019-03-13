import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <React.Fragment>
    {!isLoggedIn ? (
      <div className="left menu">
        <Menu>
          <Menu.Item>
            <Link to="/Login">Login</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/Signup">Sign Up</Link>
          </Menu.Item>
        </Menu>
      </div>
    ) : (
      <div className="right menu">
        <Menu>
          <Menu.Item>
            <Link to="/home">
              <i className="home icon" />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/Leaderboard">Leaderboard</Link>
          </Menu.Item>
          <Menu.Item>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </Menu.Item>
        </Menu>
      </div>
    )}
  </React.Fragment>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
