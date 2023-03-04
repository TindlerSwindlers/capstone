import React from 'react';
import { connect } from 'react-redux';
import { editPost } from '../store';

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      text: '',
      myImage: {},
      imageUrl: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.location.state.post);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text === '') {
      alert('It needs text');
    } else {
      const formData = new FormData();
      formData.append('myImage', this.state.myImage);
      formData.append('text', this.state.text);
      this.props.editPost(this.state.id, formData);
    }
  }

  handleChange(e) {
    console.log(this.state);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileUpload(e) {
    this.setState({ myImage: e.target.files[0] });
  }

  render() {
    const { handleSubmit, handleChange, handleFileUpload } = this;
    const { text } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">Text</label>
          <input name="text" value={text} onChange={handleChange}></input>
          <input
            type="file"
            label="Image"
            name="myFile"
            accept=".jpeg, .png, .jpg"
            onChange={handleFileUpload}
          />
          <button>Save</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editPost: (id, data) => {
    dispatch(editPost(id, data));
  },
});

export default connect((state) => state, mapDispatchToProps)(EditPost);
