import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addComment } from "../store/comments";
import { fetchPosts } from "../store/posts";

const AddComment = ({ postId, userId }) => {
  useEffect(() => {
    fetchPosts();
  }, []);
  const onSubmit = (data, event) => {
    event.preventDefault();
    dispatch(addComment(postId, userId, data));
    event.target.reset();
    // dispatch(fetchPosts());
  };
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='text'>New comment: </label>
        <input type='text' name='text' {...register("text")} />
        <button className='btn btn-primary' type='submit'>
          Add comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
