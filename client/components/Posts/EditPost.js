import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editPost } from '../../store/posts';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
        justifyContent: 'space-around',
        width: '60%',
        height: '10rem',
        padding: '1rem',
      }}
    >
      <TextField
        id="text"
        label="text"
        name="text"
        value={inputs.text}
        onChange={handleChange}
      />
      <input
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
  );
};

export default EditPost;
