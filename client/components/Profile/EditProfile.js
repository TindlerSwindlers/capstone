import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
/**
 * COMPONENT
 */
const hobbies = [
  'Wine',
  'Fishing',
  'Music',
  'Cooking',
  'Hiking',
  'Chatting',
  'Movie',
  'Coffee',
  'Book',
  'Skiing',
];

const ProfileForm = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    name: '',
    lastName: '',
    hobbies: [],
    interest: '',
    gender: '',
    imageUrl: '',
    myImage: {},
  });

  useEffect(() => {
    if (auth) {
      setInputs({
        username: auth.username,
        password: auth.password,
        name: auth.name,
        lastName: auth.lastName,
        hobbies: [...auth.hobbies],
        interest: auth.interest,
        gender: auth.gender,
        imageUrl: auth.imageUrl,
      });
    }
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('formName', inputs.formName);
    formData.append('username', inputs.username);
    formData.append('password', inputs.password);
    formData.append('name', inputs.name);
    formData.append('lastName', inputs.lastName);
    formData.append('hobbies', inputs.hobbies);
    formData.append('interest', inputs.interest);
    formData.append('gender', inputs.gender);
    formData.append('imageUrl', inputs.imageUrl);
    formData.append('myImage', inputs.myImage);
    dispatch(updateProfile(formData));
  };

  const handleFileUpload = (e) => {
    setInputs({ ...inputs, myImage: e.target.files[0] });
  };

  return (
    <div className="profile-form">
      <Box>
        <TextField
          sx={{ margin: 1 }}
          label="Username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <TextField
          sx={{ margin: 1 }}
          type="password"
          label="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <TextField
          sx={{ margin: 1 }}
          label="FirstName"
          name="name"
          value={inputs.name}
          onChange={handleChange}
        />
        <TextField
          sx={{ margin: 1 }}
          label="LastName"
          name="lastName"
          value={inputs.lastName}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 120, margin: 1 }}>
          <InputLabel>Gender</InputLabel>
          <Select name="gender" onChange={handleChange} value={inputs.gender}>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, margin: 1 }}>
          <InputLabel>Interest</InputLabel>
          <Select
            name="interest"
            onChange={handleChange}
            value={inputs.interest}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, margin: 1 }}>
          <InputLabel>Hobbies</InputLabel>
          <Select
            name="hobbies"
            onChange={handleChange}
            value={inputs.hobbies}
            multiple={true}
          >
            {hobbies.map((hobby, i) => (
              <MenuItem key={i} value={hobby}>
                {hobby}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Input
          type="file"
          label="Image"
          name="myImage"
          accept=".jpeg, .png, .jpg"
          onChange={handleFileUpload}
        />
      </Box>
      <Button
        type="submit"
        onClick={handleSubmit}
        sx={{ backgroundColor: '#3498DB', color: '#2C3E50', margin: 1 }}
      >
        Edit
      </Button>
    </div>
  );
};

export default ProfileForm;
