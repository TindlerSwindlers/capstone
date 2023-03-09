import React from "react";
import { connect } from "react-redux";
import { deletePost } from "../store/posts";
import { setComments } from "../store/comments";
import { Link } from "react-router-dom";
import Comment from "./Comment";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.setComments(this.props.post);
  }
  handleClick() {
    this.props.deletePost(id);
  }

  render() {
    const { id, text, likes, imageUrl, comments, user } = this.props.post;
    const post = this.props.post;
    const { auth } = this.props;
    return (
      <div>
        {auth.id ? (
          <div>
            <button onClick={(e) => handleClick(e)}>x</button>
            <button>
              <Link
                to={{
                  pathname: `/editpost/${id}`,
                  state: {
                    post,
                  },
                }}
              >
                Edit Post
              </Link>
            </button>
          </div>
        ) : (
          ""
        )}
        <p>post :{text}</p>
        <img src={imageUrl} width='300' height='300'></img>
        <p>from : {user.username}</p>
        <p>likes:{likes}</p>
        <p>comments:</p>
        <Comment comments={comments} postId={id} userId={user.id} />
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deletePost: (id) => {
    dispatch(deletePost(id));
  },
  setComments: (id) => {
    dispatch(setComments(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Post);
