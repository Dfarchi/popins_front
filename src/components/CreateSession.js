import React, { useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useUser, useUserDispatch } from "../context/userContextFull";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const SessionForm = ({ selectedDay, onCloseModal }) => {
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    date: selectedDay,
    salary: "",
    note: "",
  });

  const currentUser = useUser();
  const currentUserDispatch = useUserDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createSession = async () => {
    const { date, salary, note } = formData;

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/session/", {
        date,
        salary,
        note,
        user: currentUser.id,
      });

      if (response.status === 200) {
        const session = response.data;
        console.log("Session", session);
        currentUserDispatch({
          type: "CREATE_SESSION",
          payload: session,
        });
        onCloseModal();
        setShowAlert(true);
      }

      console.log("Session created:", response.data);

      // Reset the form data
      setFormData({
        date: selectedDay,
        salary: "",
        note: "",
      });
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  return (
    <Container maxwidth="sm">
      <Card sx={style}>
        <CardContent>
          <Typography variant="h5" component="div">
            Create Session
          </Typography>
          <TextField
            name="date"
            value={formData.date}
            disabled
            fullWidth
            margin="normal"
            variant="outlined"
            label="Date"
          />

          <TextField
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            label="Salary"
          />

          <TextField
            name="note"
            value={formData.note}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            label="Note"
          />

          <Button variant="contained" color="primary" onClick={createSession}>
            Create
          </Button>
        </CardContent>
      </Card>
      {showAlert && (
        <Alert variant="filled" severity="success">
          MAZAL-TOV — you have created a new session!
        </Alert>
      )}
    </Container>
  );
};

export default SessionForm;
