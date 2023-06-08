import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import { initialUser } from "./context/userContext";
// import { useContext } from "react";
import axios from "axios";
// here is a change
import HomePage from "./pages/hompage";
import Sessionpage from "./pages/session";
import ProfilePage from "./pages/profile_page";
import Root from "./utils/root";
import { useState } from "react";
import SignupForm from "./registration/signup_form";
import {
  UserProvider,
  useUser,
  useUserDispatch,
} from "./context/userContextFull";

const App = () => {
  const currentUser = useUser();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/token/refresh/",
            {
              refresh: refreshToken,
            }
          );
          if (response.status === 200) {
            const accessToken = response.data.access;
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
              userDispatch({
                type: "POPULATE",
                payload: userResponse.data,
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    checkLoginStatus();
  }, [userDispatch]);

  useEffect(() => {
    if (currentUser.id) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.removeItem("isLoggedIn");
    }
  }, [currentUser.id]);

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/session" element={<Sessionpage />} />
          <Route path={"/profile"} element={<ProfilePage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};
export default App;
