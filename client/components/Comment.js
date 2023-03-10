import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../store/posts";

const Comment = ({ comments, postId }) => {
  //   const { comments } = post;
  const dispatch = useDispatch();
  const handleClick = (id) => {
    console.log("ID FROM HANDLE", id);
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
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Comment;
