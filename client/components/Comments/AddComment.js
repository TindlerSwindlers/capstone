import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addComment } from "../../store/comments";

const AddComment = ({ postId, userId }) => {
  const dispatch = useDispatch();
  const onSubmit = (data, event) => {
    event.preventDefault();
    dispatch(addComment(postId, userId, data));
    event.target.reset();
  };
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
