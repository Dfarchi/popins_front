import { Button, Container } from "@mui/material";
import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function calculateAge(yearOfBirth) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearOfBirth;
  return age;
}

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("in Profile_page", currentUser.id);
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };
  if (!currentUser.id) return navigateTo("/");

  if (currentUser.id) {
    return (
      <div>
        <Container maxWidth="sm">
          <h1>Welcome {currentUser.name}!</h1>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Avatar
              src={currentUser.profile_pic}
              sx={{ width: 56, height: 56 }}
            />
            <TextField
              id="username"
              helperText={`current is " ${currentUser.name} " `}
              label="username"
              variant="filled"
            />
            <TextField
              id="email"
              helperText={`current is " ${currentUser.email} " `}
              label="email"
              variant="filled"
            />
            <TextField
              id="age"
              helperText={`current is " ${calculateAge(
                currentUser.birth_year
              )} " `}
              label="age"
              variant="filled"
            />
            <TextField
              id="Adress"
              helperText={`current is " ${currentUser.address} " `}
              label="Address"
              variant="filled"
            />
            <TextField
              id="bio"
              helperText="Please enter your bio"
              // {currentUser.bio}
              label=" "
              multiline
              maxRows={4}
              variant="filled"
            />
            <Link
              href={currentUser.social}
              component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              {currentUser.name}'s social link
            </Link>
          </Box>
          <Button variant="contained">submit</Button>{" "}
        </Container>
      </div>
    );
  } else {
    return (
      <Container>
        <h1>This is going to be a 404 page</h1>
      </Container>
    );
  }
};
export default ProfilePage;
