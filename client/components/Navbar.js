import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/auth";
import Avatar from "@mui/material/Avatar";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
  },
  icon: {
    color: "#3498DB",
  },
}));

const Navbar = ({ handleClick, isLoggedIn, auth }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <h1>Welcome to Spark!</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
              <List>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to='/home'>Home</Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to='/newpost'>New Post</Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to='/yourMatches'>Your Matches</Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to='/profile'>
                      <Avatar alt={auth.name} src={auth.imageUrl} />
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <a href='#' onClick={handleClick}>
                      Logout
                    </a>
                  </ListItemText>
                </ListItem>
              </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
              <MenuIcon />
              <Typography> Menu</Typography>
            </IconButton>
          </>
        ) : (
          // <div>
          //   {/* The navbar will show these links after you log in */}

          //   <Link to='/home'>Home</Link>
          //   <Link to='/newpost'>New Post</Link>
          //   <Link to='/yourMatches'>Your Matches</Link>
          //   <Link to='/profile'>
          //     <Avatar alt={auth.name} src={auth.imageUrl} />
          //   </Link>
          //   <a href='#' onClick={handleClick}>
          //     Logout
          //   </a>
          // </div>
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
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
