import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import { initialUser } from "./context/userContext";
import { UserProvider } from "./context/userContext";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
// here is a change
import HomePage from "./pages/hompage";
import Sessionpage from "./pages/session";
import ProfilePage from "./pages/profile_page";
import Root from "./utils/root";
import { useState } from "react";
import SignupForm from "./registration/signup_form";

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  console.log(currentUser);

  // const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.id) {
      const getAccessToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          // console.log("in if refresh token", refreshtoken);
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
                setCurrentUser(userResponse.data);
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      };

      getAccessToken();
    }
  }, [currentUser.id]);

  return (
    <UserProvider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route
          path="/"
          element={
            <UserProvider>
              <Root />
            </UserProvider>
          }
        >
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
