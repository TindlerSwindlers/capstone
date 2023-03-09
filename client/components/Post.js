import React from 'react';
import { connect } from 'react-redux';
import { deletePost, addLikes } from '../store/posts';
import { setComments } from '../store/comments';
import { Link } from 'react-router-dom';
import Comment from './Comment';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleLikes = this.handleLikes.bind(this);
  }
  componentDidMount() {
    this.props.setComments(this.props.post);
  }
  handleClick(id) {
    this.props.deletePost(id);
  }
  handleLikes(id, auth) {
    this.props.addLikes(id, auth);
  }

  render() {
    const { id, text, likes, imageUrl, comments, user } = this.props.post;
    const post = this.props.post;
    const { auth } = this.props;
    const { handleClick, handleLikes } = this;
    return (
      <div>
        {auth.id === user.id ? (
          <div>
            <button onClick={(e) => handleClick(id)}>x</button>
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
          ''
        )}
        <p>post :{text}</p>
        <img src={imageUrl} width="300" height="300"></img>
        <p>from : {user.username}</p>
        <p>
          likes:{likes.length}
          <button onClick={(e) => handleLikes(id, auth)}>Likes</button>
        </p>
        <p>comments:</p>
        <Comment comments={comments} postId={id} />
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
  addLikes: (id, auth) => {
    dispatch(addLikes(id, auth));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Post);
