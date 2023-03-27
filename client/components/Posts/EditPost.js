import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editPost } from '../../store/posts';
import { Box, Input, TextField, Button, Typography } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const EditPost = (props) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    id: 0,
    text: '',
    myImage: {},
    imageUrl: '',
  });
  useEffect(() => {
    setInputs({
      id: props.location.state.post.id,
      text: props.location.state.post.text,
      myImage: props.location.state.post.myImage,
      imageUrl: props.location.state.post.imageUrl,
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.text === '') {
      alert('It needs text');
    } else {
      const formData = new FormData();
      formData.append('text', inputs.text);
      formData.append('myImage', inputs.myImage);
      dispatch(editPost(inputs.id, formData));
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
          value={inputs.text}
          onChange={handleChange}
        />
        <Typography variant="h6">Want edit picture?</Typography>
        <Input
          sx={{ margin: 1 }}
          type="file"
          label="Image"
          name="myImage"
          accept=".jpeg, .png, .jpg"
          defaultValue={inputs.imageUrl}
          onChange={handleFileUpload}
        />
        <Button
          variant="contained"
          endIcon={<BorderColorIcon />}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditPost;
