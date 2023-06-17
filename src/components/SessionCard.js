import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Switch,
  IconButton,
} from "@mui/material";
import { useUserDispatch, useUser } from "../context/userContextFull";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const SessionCard = ({ session }) => {
  const { id, date, salary, note, has_happened, user, interested_nannies } =
    session;
  const userDispatch = useUserDispatch();
  const currentUser = useUser();

  const [isHappened, setIsHappened] = useState(has_happened);
  const accessToken = localStorage.getItem("accessToken");
  const cardColor = has_happened ? "#A0A0A0" : "#FFFFFF";

  const handleSwitchChange = async () => {
    setIsHappened(!isHappened);
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/session/${id}/`,
        { has_happened: !isHappened },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        userDispatch({
          type: "UPDATE_SESSION",
          payload: { sessionId: id, hasHappened: isHappened },
        });
        console.log(
          "date = ",
          session.date,
          "has_happened",
          session.has_happened,
          "currentUser",
          currentUser.sessions[4]["date"],
          currentUser.sessions[4]["has_happened"]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/session/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 204) {
        userDispatch({ type: "DELETE_SESSION", payload: id });
        console.log(
          "date = ",
          session.date,
          "has_happened",
          session.has_happened,
          "currentUser",
          currentUser.sessions[2]["has_happened"]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    (cardColor) => {
      cardColor = isHappened ? "#A0A0A0" : "#FFFFFF";
      // Update the cardColor variable based on the isHappened state
    },
    [isHappened]
  );

  return (
    <Card
      maxWidth="sm"
      style={{
        display: "flex",
        margin: "10px ",
        backgroundColor: cardColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          Date: {date}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Salary: {salary}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Note: {note}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Has Happened: {isHappened ? "Yes" : "No"}
        </Typography>
        <IconButton aria-label="Delete" onClick={handleDelete}>
          <Delete />
        </IconButton>
        {!isHappened && (
          <>
            <Typography variant="body1" color="text.secondary">
              Interested Nannies: {interested_nannies.length}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Appoint Nanny: TBA
            </Typography>
          </>
        )}
        <Switch
          checked={isHappened}
          onChange={handleSwitchChange}
          color="primary"
        />
      </CardContent>
    </Card>
  );
};

export default SessionCard;
