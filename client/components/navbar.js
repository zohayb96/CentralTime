import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <React.Fragment>
    {!isLoggedIn ? (
      <div className="ui secondary  menu">
        <a className="item">
          <Link to="/Login">Login</Link>
        </a>
        <a className="item">
          <Link to="/Signup">Sign Up</Link>
        </a>
      </div>
    ) : (
      <div className="ui secondary  menu">
        <a className="item">
          <Link to="/home">
            <i className="home icon" />
          </Link>
        </a>
        <a href="#" onClick={handleClick} className="item">
          Logout
        </a>
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
