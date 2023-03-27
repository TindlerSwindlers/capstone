import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { authenticate } from "../store/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
/**
 * COMPONENT
 */
const hobbies = [
  "Wine",
  "Fishing",
  "Music",
  "Cooking",
  "Hiking",
  "Chatting",
  "Movie",
  "Coffee",
  "Book",
  "Skiing",
];

const AuthForm = (props) => {
  const { formName, displayName, error } = props;
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    formName: props.formName,
    username: "",
    password: "",
    name: "",
    lastName: "",
    hobbies: [],
    interest: "",
    gender: "",
    imageUrl: "",
    myImage: {},
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("formName", inputs.formName);
    formData.append("username", inputs.username);
    formData.append("password", inputs.password);
    formData.append("name", inputs.name);
    formData.append("lastName", inputs.lastName);
    formData.append("hobbies", inputs.hobbies);
    formData.append("interest", inputs.interest);
    formData.append("gender", inputs.gender);
    formData.append("imageUrl", inputs.imageUrl);
    formData.append("myImage", inputs.myImage);
    dispatch(authenticate(formData));
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFileUpload = (e) => {
    setInputs({ ...inputs, myImage: e.target.files[0] });
  };

  return (
    <Box
      sx={{
        padding: 40,
        maxWidth: "80%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        name={props.formName}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <Box
          sx={{
            backgroundColor: "#3498DB",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
            borderRadius: "16px",
          }}
        >
          <TextField
            id='username'
            label='Username'
            name='username'
            onChange={handleChange}
          />
          <TextField
            id='password'
            label='Password'
            name='password'
            onChange={handleChange}
          />
        </Box>
        {formName === "signup" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#3498DB",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
              borderRadius: "16px",
            }}
          >
            <Box sx={{ marginLeft: 0 }}>
              <TextField
                id='name'
                label='FirstName'
                name='name'
                onChange={handleChange}
              />
              <TextField
                id='lastName'
                label='LastName'
                name='lastName'
                onChange={handleChange}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name='gender'
                  onChange={handleChange}
                  value={inputs.gender}
                >
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='other'>Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Interest</InputLabel>
                <Select
                  name='interest'
                  onChange={handleChange}
                  value={inputs.interest}
                >
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='other'>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Hobbies</InputLabel>
              <Select
                name='hobbies'
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
              type='file'
              label='Image'
              name='myImage'
              accept='.jpeg, .png, .jpg'
              onChange={handleFileUpload}
            />
          </Box>
        ) : (
          <span />
        )}
        <Button
          type='submit'
          sx={{ backgroundColor: "#3498DB", color: "#2C3E50", margin: 1 }}
        >
          {displayName}
        </Button>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </Box>
  );
};

const mapLogin = (state) => {
  return {
    formName: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    formName: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

export const Login = connect(mapLogin)(AuthForm);
export const Signup = connect(mapSignup)(AuthForm);
