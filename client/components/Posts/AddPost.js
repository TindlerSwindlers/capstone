import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../store/posts';
import { Box, Input, TextField, Button, Typography } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const AddPost = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    text: '',
    myImage: {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.text === '') {
      alert('It needs text');
    } else {
      const formData = new FormData();
      formData.append('text', inputs.text);
      formData.append('myImage', inputs.myImage);
      dispatch(addPost(auth.id, formData));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFileUpload = (e) => {
    setInputs({ ...inputs, myImage: e.target.files[0] });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          sx={{ margin: 1, backgroundColor: 'white' }}
          id="text"
          label="text"
          name="text"
          onChange={handleChange}
        />
        <Typography variant="h6">Want show picture?</Typography>
        <Input
          sx={{ margin: 1 }}
          type="file"
          label="Image"
          name="myImage"
          accept=".jpeg, .png, .jpg"
          onChange={handleFileUpload}
        />
        <Button
          variant="contained"
          endIcon={<BorderColorIcon />}
          onClick={handleSubmit}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default AddPost;
