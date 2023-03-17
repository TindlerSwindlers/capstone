import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, addLikes } from "../../store/posts";
import { setComments } from "../../store/comments";
import { Link } from "react-router-dom";
import Comment from "../Comments/Comment";

const Post = (props) => {
  const { id, text, likes, imageUrl, comments, user } = props.post;
  const post = props.post;

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setComments(props.post));
  }, []);

  const handleClick = () => {
    dispatch(deletePost(id));
  };
  const handleLikes = () => {
    dispatch(addLikes(id, auth));
  };

  return (
    <div>
      {auth.id === user.id ? (
        <div>
          <button onClick={handleClick}>x</button>
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
        </div>
      ) : (
        <span />
      )}
      <p>post :{text}</p>
      <img src={imageUrl} width='300' height='300'></img>
      <p>from : {user.username}</p>
      <p>
        likes:{likes.length}
        <button onClick={handleLikes}>Likes</button>
      </p>
      <p>comments:</p>
      <Comment comments={comments} postId={id} userId={user.id} />
      <hr />
    </div>
  );
};

export default Post;
