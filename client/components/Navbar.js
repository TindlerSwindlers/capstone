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
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = ({ handleClick, isLoggedIn, auth }) => {
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
                    <Link to='/messages'>Messages</Link>
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
              <Typography
                sx={{ color: "black", fontSize: 22, fontFamily: "verdana" }}
              >
                {" "}
                Menu
              </Typography>
            </IconButton>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <List
              sx={{
                display: "flex",
                height: 30,
                marginTop: 5,
                backgroundColor: "#3498DB",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
                borderRadius: "16px",
                color: "black",
              }}
            >
              <ListItem>
                <ListItemText>
                  <Link to='/login'>
                    <Typography sx={{ color: "black" }}>Login</Typography>
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link to='/signup'>
                    <Typography sx={{ color: "black" }}>Sign Up</Typography>
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: state.auth.id,
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
