import React, { useState, useContext, useEffect } from "react";
import { Container } from "@mui/material";
import SessionCard from "../components/SessionCard";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { HandymanOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SessionPage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };
  // const [sessions, setSessions] = useState([]);

  // // const handleUpdateUser = (sortedSessions) => {
  // //  ;
  // // };

  // useEffect(() => {
  //   if (currentUser && currentUser.is_parent) {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const fetchSessions = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://127.0.0.1:8000/api/session/",
  //           {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //             body: {
  //               username: currentUser.username,
  //             },
  //           }
  //         );
  //         setSessions(response.data);
  //         setCurrentUser({ ...currentUser, sessions: sessions });
  //         console.log("current in session", currentUser);
  //       } catch (error) {
  //         console.error("Error fetching sessions:", error);
  //       }
  //     };
  //     fetchSessions();
  //   }
  // }, [currentUser]);

  // if (sessions.length > 0) {
  //   const sortedSessions = sessions.sort((a, b) =>
  //     a.date.localeCompare(b.date)
  //   );

  if (!currentUser.id) return navigateTo("/");

  if (currentUser.id) {
    const userSessions = currentUser.sessions;

    return (
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          margin: "20px ",
        }}
      >
        {userSessions.map((session) => (
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
