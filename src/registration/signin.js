// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React, { useState, useContext, useEffect } from "react";
import { Box, Button, TextField, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser, useUserDispatch } from "../context/userContextFull";

export const Signin = ({ toggleSignin }) => {
  const currentUser = useUser();
  const currentUserDispatch = useUserDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        const accessToken = response.data.access;
        // console.log("accessToken", accessToken);

        const refreshToken = response.data.refresh;
        // console.log("refreshToken", refreshToken);
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
          currentUserDispatch({
            type: "POPULATE",
            payload: userResponse.data,
          });

          const sessionResponse = await axios.get(
            "http://127.0.0.1:8000/api/session/",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              body: {
                username: currentUser.username,
              },
            }
          );
          if (sessionResponse.status === 200) {
            const sessions = sessionResponse.data;
            console.log("Sessions", sessions);
            currentUserDispatch({
              type: "GET_SESSIONS",
              payload: sessions,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    toggleSignin();
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
          navigateTo("/signup");
          toggleSignin();
        }}
      >
        Sign Up
      </Button>
      {/* </GoogleOAuthProvider> */}
    </Box>
  );
};
