import React, { useState, useContext, useEffect } from "react";
import { Container, ButtonGroup, Button } from "@mui/material";
import SessionCard from "../components/SessionCard";
import axios from "axios";
import { HandymanOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUser, useUserDispatch } from "../context/userContextFull";

const SessionPage = () => {
  const currentUser = useUser();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("date"); // Default sorting option

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  if (!currentUser.id) return navigateTo("/");

  if (currentUser.id) {
    const userSessions = currentUser.sessions;
    if (currentUser.sessions) {
      let sortedSessions = [...userSessions];
      if (sortOption === "date") {
        // Sort by date
        sortedSessions.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (sortOption === "hasHappened") {
        // Sort by "has happened" status
        sortedSessions.sort((a, b) => a.has_happened - b.has_happened);
      }

      return (
        <Container
          maxWidth="sm"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            margin: "20px ",
            marginLeft: "80px",
            zIndex: 1,
          }}
        >
          <ButtonGroup sx={{ marginBottom: 2 }}>
            <Button
              variant={sortOption === "date" ? "contained" : "outlined"}
              onClick={() => handleSortOptionChange("date")}
            >
              Sort by Date
            </Button>
            <Button
              variant={sortOption === "hasHappened" ? "contained" : "outlined"}
              onClick={() => handleSortOptionChange("hasHappened")}
            >
              Sort by Happened or not
            </Button>
          </ButtonGroup>
          {sortedSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </Container>
      );
    } else {
      return (
        <Container>
          <h1>This is going to be a 404 page</h1>
        </Container>
      );
    }
  }
};

export default SessionPage;
