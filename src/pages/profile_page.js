import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useUser, useUserDispatch } from "../context/userContextFull";
import axios from "axios";
import Alert from "@mui/material/Alert";

function calculateAge(currentYear, yearOfBirth) {
  const age = currentYear - yearOfBirth;
  return age;
}

const UpdateProfile = async (
  fieldValue,
  fieldName,
  currentUserDispatch,
  currentUser,
  setAlert
) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    console.log("accesstoken:", accessToken);
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/profile/${currentUser.id}/`,
      {
        [fieldName]: fieldValue,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      currentUserDispatch({
        type: "POPULATE",
        payload: response.data,
      });
      setAlert({
        type: "success",
        message: `Profile updated successfully!`,
      });
    }
  } catch (error) {
    console.log(error);
    setAlert({
      type: "error",
      message: error.message,
    });
  }
};

const ProfilePage = () => {
  const currentYear = new Date().getFullYear();
  const currentUser = useUser();
  const currentUserDispatch = useUserDispatch();
  const [username, setUsername] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [age, setAge] = useState(
    calculateAge(currentYear, currentUser.birth_year)
  );
  const [address, setAddress] = useState(currentUser.address);
  const [bio, setBio] = useState(currentUser.bio);
  const [social, setSocial] = useState(currentUser.social);
  const [alert, setAlert] = useState(null); // New state for alert

  // console.log(currentUser);

  if (!currentUser.id) return <Navigate to="/" />;

  const handleFieldSubmit = (fieldValue, fieldName) => {
    UpdateProfile(
      fieldValue,
      fieldName,
      currentUserDispatch,
      currentUser,
      setAlert
    );
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 5 }}>
        {alert && (
          <Alert severity={alert.type} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Welcome {currentUser.name}!
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}
        >
          <Avatar
            src={currentUser.profile_pic}
            sx={{ width: 56, height: 56 }}
          />
        </Box>

        <Box id="username" sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            onClick={() => handleFieldSubmit(username, "name")}
          >
            Change
          </Button>
        </Box>

        <Box id="email" sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            onClick={() => handleFieldSubmit(email, "email")}
          >
            Change
          </Button>
        </Box>

        <Box id="age" sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="age"
            label="Age"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            onClick={() => handleFieldSubmit(currentYear - age, "birth_year")}
          >
            Change
          </Button>
        </Box>

        <Box id="address" sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="address"
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            onClick={() => handleFieldSubmit(address, "address")}
          >
            Change
          </Button>
        </Box>

        <Box id="bio" sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="bio"
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            minRows={4}
            maxRows={6}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            onClick={() => handleFieldSubmit(bio, "bio")}
          >
            Change
          </Button>
        </Box>

        <Box id="social" sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="social"
            label={`${currentUser.name}'s social link`}
            variant="outlined"
            value={social}
            onChange={(e) => setSocial(e.target.value)}
            InputProps={{
              sx: {
                color: "blue",
                textDecoration: "underline",
                "&:hover": {
                  cursor: "pointer",
                },
              },
            }}
          />
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            onClick={() => handleFieldSubmit(social, "social")}
          >
            Change
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
