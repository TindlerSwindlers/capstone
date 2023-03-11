import React from 'react';
import { connect } from 'react-redux';
import { addPost, me } from '../store';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      myImage: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text === '') {
      alert('It needs text');
    } else {
      const formData = new FormData();
      formData.append('myImage', this.state.myImage);
      formData.append('text', this.state.text);
      this.props.addPost(this.props.auth.id, formData);
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileUpload(e) {
    this.setState({ myImage: e.target.files[0] });
  }

  render() {
    const { handleSubmit, handleChange, handleFileUpload } = this;
    const { text } = this.state;
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
        <TextField id="text" label="text" name="text" onChange={handleChange} />
        <input
          type="file"
          label="Image"
          name="myFile"
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
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPost: (id, data) => {
    dispatch(addPost(id, data));
  },
});

export default connect((state) => state, mapDispatchToProps)(AddPost);
