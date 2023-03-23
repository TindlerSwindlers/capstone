import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';
import Avatar from '@mui/material/Avatar';

const Navbar = ({ handleClick, isLoggedIn, auth }) => {
  return (
    <div>
      <h1>Welcome to Spark!</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}

            <Link to="/home">Home</Link>
            <Link to="/newpost">New Post</Link>
            <Link to="/yourMatches">Your Matches</Link>
            <Link to="/profile">
              <Avatar alt={auth.name} src={auth.imageUrl} />
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
