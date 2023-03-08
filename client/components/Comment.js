import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../store/posts";
import AddComment from "./AddComment";

const Comment = ({ comments, postId, userId }) => {
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(deleteComment(id, postId));
  };

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
              <AddComment postId={postId} userId={userId} />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Comment;
