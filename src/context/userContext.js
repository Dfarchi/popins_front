import { createContext, useReducer, useContext, useState } from "react";
import parentReducer from "./parent_reducer";

const initialUser = {
  address: "",
  bio: "",
  birth_year: null,
  email: "",
  id: "",
  is_parent: null,
  name: "",
  profile_oic: null,
  social: null,
  user: null,
  sessions: null,
};
export const UserContext = createContext(initialUser);
console.log("UserContext", UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// export const UserProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(parentReducer, initialUser);
//   const { currentUser, setCurrentUser } = useUser();

//   const add_session = (session) => {
//     const updatedSessions = state.user_sessions.concat(session);
//     dispatch({
//       type: "CREATE_SESSION",
//       payload: {
//         user_sessions: updatedSessions,
//       },
//     });
//   };

//   const value = {
//     ...state,
//     currentUser,
//     setCurrentUser,
//     sessions: state.user_sessions,
//     add_session,
//   };
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };
// export const useUser = () => {
//   const context = useContext(UserContext);

//   if (context === undefined) {
//     throw new Error("useUser must be used within UserContext");
//   }
//   console.log("useUser", context);
//   return context;
// };
