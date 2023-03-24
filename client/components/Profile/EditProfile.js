import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/auth';
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from '@mui/material';
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
    <Box
      className="profile-form"
      sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">Edit Your Profile</Typography>
      <Box>
        <TextField
          sx={{ margin: 1, backgroundColor: 'white' }}
          label="Username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <TextField
          sx={{ margin: 1, backgroundColor: 'white' }}
          type="password"
          label="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <TextField
          sx={{ margin: 1, backgroundColor: 'white' }}
          label="FirstName"
          name="name"
          value={inputs.name}
          onChange={handleChange}
        />
        <TextField
          sx={{ margin: 1, backgroundColor: 'white' }}
          label="LastName"
          name="lastName"
          value={inputs.lastName}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControl
          sx={{ minWidth: 195, margin: 1, backgroundColor: 'white' }}
        >
          <InputLabel>Gender</InputLabel>
          <Select name="gender" onChange={handleChange} value={inputs.gender}>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{ minWidth: 195, margin: 1, backgroundColor: 'white' }}
        >
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
      </Box>
      <Box>
        <FormControl sx={{ minWidth: 400, margin: 1 }}>
          <InputLabel>Hobbies</InputLabel>
          <Select
            sx={{ backgroundColor: 'white' }}
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
      </Box>
      <Box>
        <Typography variant="h6">Change profile picture?</Typography>
        <Input
          sx={{ minWidth: 380, margin: 1 }}
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
    </Box>
  );
};

export default ProfileForm;
