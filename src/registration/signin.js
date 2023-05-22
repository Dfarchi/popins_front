import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
// import Login from "./Login";
import Signup from "../registration/signup_form";
import { Box, Button, TextField, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { UserContext } from "../context/userContext";

export const Signin = ({ toggleSignin }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  console.log("currentUser in login", currentUser);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    console.log("in signin useEffect", currentUser);
    if (currentUser.id) {
      navigate(`/`);
      //profile/${currentUser.id}
    }
  }, [currentUser.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(event);
    // catch((error) => {
    //   console.log(error);
    // });
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        const accessToken = response.data.access;
        console.log(accessToken);

        const refreshToken = response.data.refresh;
        console.log(refreshToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessToken", accessToken);

        const userResponse = await axios.get(
          "http://127.0.0.1:8000/api/profile/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (userResponse.status === 200) {
          setCurrentUser(userResponse.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", Padding: "2" }}>
          <TextField
            label="Username"
            type="username"
            value={username}
            onChange={handleUsernameChange}
            required
            variant="filled"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            variant="filled"
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
      <h5> OR</h5>
      <Button
        variant="contained"
        onClick={() => {
          // navigateTo("/signup");
          toggleSignin();
        }}
      >
        Sign Up
      </Button>
      {/* </GoogleOAuthProvider> */}
    </Box>
  );
};
