import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';
import Avatar from '@mui/material/Avatar';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = ({ handleClick, isLoggedIn, auth }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div
      style={{
        backgroundColor: '#E6B0AA',
        borderRadius: '15px 15px 0 0',
      }}
    >
      <Box
        sx={{
          padding: '1rem',
          color: 'yellow',
        }}
      >
        <Link to="/home">
          <h1 style={{ color: '#FEF9E7' }}>Spark!</h1>
        </Link>
      </Box>
      <nav>
        {isLoggedIn ? (
          <Box>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
              <List>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to="/home">Home</Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to="/newpost">New Post</Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to="/yourMatches">Your Matches</Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link to="/messages">Messages</Link>
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                  </ListItemText>
                </ListItem>
              </List>
            </Drawer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
                <Typography
                  sx={{ color: 'black', fontSize: 22, fontFamily: 'verdana' }}
                >
                  Menu
                </Typography>
              </IconButton>
              <Link to="/profile">
                <Avatar alt={auth.name} src={auth.imageUrl} />
              </Link>
            </Box>
          </Box>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <List
              sx={{
                display: 'flex',
                height: 30,
                backgroundColor: '#3498DB',
                borderRadius: '5px',
                margin: 2,
              }}
            >
              <ListItem>
                <ListItemText>
                  <Link to="/login">
                    <Typography
                      sx={{
                        color: 'black',
                        '&:hover': {
                          color: 'white',
                        },
                      }}
                    >
                      Login
                    </Typography>
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Link to="/signup">
                    <Typography
                      sx={{
                        color: 'black',
                        '&:hover': {
                          color: 'white',
                        },
                        width: '60px',
                      }}
                    >
                      Sign Up
                    </Typography>
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </div>
        )}
      </nav>
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
