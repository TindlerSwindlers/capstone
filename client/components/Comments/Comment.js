import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comments";
import AddComment from "./AddComment";

const Comment = ({ comments, postId, userId }) => {
  const { auth } = useSelector((state) => state);
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
                {userId === auth.id ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault(), handleClick(comment.id);
                    }}
                  >
                    x
                  </button>
                ) : (
                  <span />
                )}
              </li>
            </div>
          ))}
      </ul>
      <AddComment postId={postId} userId={userId} />
    </div>
  );
};

export default Comment;
