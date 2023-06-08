import React, { useContext } from "react";

export const INITIAL_USER_STATE = {
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

function userReducer(userState, action) {
  switch (action.type) {
    case "POPULATE": {
      return {
        ...userState,
        id: action.payload.id,
        name: action.payload.name,
        user: action.payload.user,
        address: action.payload.address,
        bio: action.payload.bio,
        birth_year: action.payload.birth_year,
        email: action.payload.email,
        is_parent: action.payload.is_parent,
        profile_oic: action.payload.profile_oic,
      };
    }
    case "GET_SESSIONS": {
      return {
        ...userState,
        sessions: action.payload,
      };
    }
    case "CREATE_SESSION": {
      const newSession = {
        ...action.payload,
        has_happened: false,
      };
      return {
        ...userState,
        sessions: [...userState.sessions, newSession],
      };
    }

    case "UPDATE_SESSION": {
      const { sessionId, hasHappened } = action.payload;
      const updatedSessions = userState.sessions.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            has_happened: hasHappened,
          };
        }
        return session;
      });
      return {
        ...userState,
        sessions: updatedSessions,
      };
    }
    case "DELETE_SESSION": {
      const sessionId = action.payload;
      const updatedSessions = userState.sessions.filter(
        (session) => session.id !== sessionId
      );
      return {
        ...userState,
        sessions: updatedSessions,
      };
    }
    case "LOGOUT": {
      return INITIAL_USER_STATE;
    }
    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
}

const UserContext = React.createContext(INITIAL_USER_STATE);
const UserDispatchContext = React.createContext(() => {
  throw new Error("Forgot to wrap component in UserProvider");
});

export function UserProvider({ children }) {
  const [userState, dispatch] = React.useReducer(
    userReducer,
    INITIAL_USER_STATE
  );

  return (
    <UserContext.Provider value={userState}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}
