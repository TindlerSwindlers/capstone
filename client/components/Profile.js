import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileForm from './EditProfile';
import { fetchProfileComments } from '../store/comments';

const Profile = () => {
  const { auth, comments } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileComments(auth.id));
  }, []);
  if (auth.id) {
    return (
      <div className="profile-container">
        <div className="profile-id">
          <h1>
            {auth.name} {auth.lastName}
          </h1>{' '}
          <button onClick={() => dispatch(deleteProfile(auth.id))}>X</button>
          <img src={auth.imageUrl}></img>
          <p>Hobbies: {auth.hobbies.join(', ')}</p>
          <p>Interest: {auth.interest}</p>
          <p>Gender: {auth.gender}</p>
          Comments:
          {comments
            ? comments.comments.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
              ))
            : ''}
        </div>
        <h3>Edit Your Profile</h3>
        <ProfileForm />
      </div>
    );
  }
};

export default Profile;
