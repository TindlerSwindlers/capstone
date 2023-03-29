import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Homepage from "./components/Homepage";
import Messages from "./components/Messages/Messages";
import AddPost from "./components/Posts/AddPost";
import EditPost from "./components/Posts/EditPost";
import Profile from "./components/Profile/Profile";
import SingleProfile from "./components/Profile/SingleProfile";
import YourMatches from "./components/Profile/YourMatches";
import NewMessage from "./components/messages/NewMessage";
import { me } from "./store/auth";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path='/home' component={Homepage} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/profile/:id' component={SingleProfile} />
            <Route path='/newpost' component={AddPost} />
            <Route path='/editpost/:id' component={EditPost} />
            <Route exact path='/yourMatches' component={YourMatches} />
            <Route path='/messages' component={Messages} />
            <Route
              exact
              path='/yourMatches/newMessage'
              component={NewMessage}
            />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
