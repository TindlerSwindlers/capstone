import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/auth';

const ProfileForm = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    name: '',
    lastName: '',
    hobbies: '',
    interest: '',
    gender: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (auth) {
      setInputs({
        username: auth.username,
        password: auth.password,
        name: auth.name,
        lastName: auth.lastName,
        hobbies: auth.hobbies,
        interest: auth.interest,
        gender: auth.gender,
        imageUrl: auth.imageUrl,
      });
    }
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }
  
  const handleSubmit = () => {
    dispatch(updateProfile(inputs));
  }

  return (
    <div className="profile-form">
      <label><b>Username</b></label>
      <input
        name="username"
        defaultValue={inputs.username}
        onChange={handleChange}
      />
      <label><b>Password</b></label>
      <input
        type="password"
        name="password"
        defaultValue={inputs.password}
        onChange={handleChange}
      />
      <label><b>Frist Name</b></label>
      <input
        name="firstName"
        defaultValue={inputs.name}
        onChange={handleChange}
      />
      <label><b>Last Name</b></label>
      <input
        name="lastName"
        defaultValue={inputs.lastName}
        onChange={handleChange}
      />
      <label><b>Hobbies</b></label>
      <input
        name="hobbies"
        defaultValue={inputs.hobbies}
        onChange={handleChange}
      />
         <label><b>Interest</b></label>
      <input
        name="interest"
        defaultValue={inputs.interest}
        onChange={handleChange}
      />
         <label><b>Gender</b></label>
      <input
        name="gender"
        defaultValue={inputs.gender}
        onChange={handleChange}
      />
         <label><b>Profile Picture</b></label>
      <input
        name="iamgeUrl"
        defaultValue={inputs.imageUrl}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ProfileForm;