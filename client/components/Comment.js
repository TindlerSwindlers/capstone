import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../store/comments';
import AddComment from './AddComment';

const Comment = ({ comments, postId, userId }) => {
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(deleteComment(id, postId));
  };
  // hi
  return (
    <div>
      <ul>
        {comments &&
          comments.map((comment) => (
            <div key={comment.id}>
              <li>
                {comment.text}
                <button
                  onClick={(e) => {
                    e.preventDefault(), handleClick(comment.id);
                  }}
                >
                  x
                </button>
              </li>
            </div>
          ))}
      </ul>
      <AddComment postId={postId} userId={userId} />
    </div>
  );
};

export default Comment;
