import { Container } from "@mui/material";
import MyCalendar from "../components/Calander";
import { useUser } from "../context/userContextFull";

const Homepage = () => {
  const currentUser = useUser();
  const userSessions = currentUser.sessions;
  if (userSessions) {
    const sessionsdates = userSessions.map((session) => session.date);
    console.log("sessionsdates", sessionsdates);
    return (
      <Container sx={{ display: "flex" }}>
        <MyCalendar />
      </Container>
    );
  }
};

export default Homepage;
