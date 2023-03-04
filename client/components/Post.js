import React from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../store/posts';
import { Link } from 'react-router-dom';

const Post = ({ auth, post, deletePost }) => {
  const { id, text, likes, imageUrl, comments, user } = post;
  const handleClick = (e) => {
    e.preventDefault();
    deletePost(id);
  };
  return (
    <div>
      <button onClick={(e) => handleClick(e)}>x</button>
      <p>
        {auth.id === user.id ? (
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
        ) : (
          ''
        )}
      </p>
      <p>post :{text}</p>
      <img src={imageUrl} width="300" height="300"></img>
      <p>from : {user.username}</p>
      <p>likes:{likes}</p>
      <p>comments:</p>
      <ul>
        {comments &&
          comments.map((comment) => <li key={comment.id}>{comment.text}</li>)}
      </ul>
      <hr />
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  deletePost: (id) => {
    dispatch(deletePost(id));
  },
});
export default connect((state) => state, mapDispatchToProps)(Post);
