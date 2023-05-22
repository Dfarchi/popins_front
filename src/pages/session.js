import React, { useState, useContext, useEffect } from "react";
import { Container } from "@mui/material";
import SessionCard from "../components/SessionCard";
import axios from "axios";
import { UserContext } from "../context/userContext";

const SessionPage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.is_parent) {
      const accessToken = localStorage.getItem("accesstoken");
      const fetchSessions = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/session/",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              params: {
                username: currentUser.username,
              },
            }
          );
          setSessions(response.data);
        } catch (error) {
          console.error("Error fetching sessions:", error);
        }
      };
      fetchSessions();
    }
  }, [currentUser]);

  if (sessions.length > 0) {
    const sortedSessions = sessions.sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    return (
      <Container maxWidth="sm">
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
};

export default SessionPage;
