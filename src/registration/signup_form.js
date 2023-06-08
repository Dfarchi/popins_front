import * as React from "react";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/material";
import { useState } from "react";
import { TextField, Container } from "@mui/material";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { useUser, useUserDispatch } from "../context/userContextFull";

export default function Signup({ handleSignupClose }) {
  console.log("hey im here");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedpassword, setconfirmedPassword] = useState("");
  const [isParent, setIsParent] = useState(false);
  const [PasswordIncorrect, setPasswordIncorrect] = useState(false);
  const [SuccessedSubmit, setSuccessedSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useUser();
  const currentUserDispatch = useUserDispatch();
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

  const handleSwitchChange = () => {
    setIsParent((prevIsParent) => !prevIsParent);
  };

  const handleConfirmPasswordChange = (event) => {
    setconfirmedPassword(event.target.value);
  };

  useEffect(() => {
    if (SuccessedSubmit === true && currentUser.id) {
      navigateTo(`/profile/${currentUser.id}`);
    }
  }, [currentUser.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccessedSubmit(false);
    setPasswordIncorrect(false);

    if (password !== confirmedpassword) {
      console.log("Password and confirmed password do not match.");
      setIsLoading(false);
      setPasswordIncorrect(true);
    }

    axios
      .post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
        confirmed_password: confirmedpassword,
        is_parent: isParent,
      })
      .then((response) => {
        handleSignupClose();
        console.log("Sign-up successful!");
        console.log(response.data);
        setUsername("");
        setPassword("");
        setconfirmedPassword("");
        setIsLoading(false);
        setSuccessedSubmit(true);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setIsLoading(false);
          console.log("Invalid username or password!");
        } else {
          setIsLoading(false);
          console.error("Sign-up failed!");
          console.log(error);
        }
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "lightgray",
          borderRadius: "1em 0 0 1em",
          border: " grey",
        }}
      >
        <form onSubmit={handleSubmit}>
          {SuccessedSubmit && (
            <Alert severity="success">{`Sign-up successful! Welcome ${username}`}</Alert>
          )}
          <Stack
            alignItems="center"
            sx={{ width: "100%" }}
            padding={4}
            spacing={2}
          >
            <TextField
              label="Username"
              type="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />

            <TextField
              label="Coonfirm Password"
              type="Password"
              value={confirmedpassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <h4> I am a...</h4>
            <Switch
              checked={isParent}
              onChange={handleSwitchChange}
              color="info"
              slotProps={{
                track: {
                  children: (
                    <React.Fragment>
                      <Box
                        px={2}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <Typography
                          component="span"
                          level="inherit"
                          sx={{ ml: "10px" }}
                        >
                          Parent
                        </Typography>
                        <Typography
                          component="span"
                          level="inherit"
                          sx={{ mr: "8px" }}
                        >
                          Nanny
                        </Typography>
                      </Box>
                    </React.Fragment>
                  ),
                },
              }}
              sx={{
                "--Switch-gap": "30px",
                "--Switch-trackWidth": "200px",
                "--Switch-thumbSize": "15px",
              }}
            />
            <LoadingButton type="submit" loading={isLoading} variant="outlined">
              Submit
            </LoadingButton>
          </Stack>
          {PasswordIncorrect && (
            <Alert severity="error">
              {" "}
              "Password and confirmed password do not match
            </Alert>
          )}
        </form>
      </Box>
    </Container>
  );
}
