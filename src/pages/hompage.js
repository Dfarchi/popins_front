import { Container } from "@mui/material";
import MyCalendar from "../components/Calander";
import { useUser } from "../context/userContextFull";

const Homepage = () => {
  const currentUser = useUser();
  const userSessions = currentUser.sessions;
  return (
    <Container sx={{ display: "flex" }}>
      <MyCalendar />
    </Container>
  );
};

export default Homepage;

// import { Container } from "@mui/material";
// import MyCalendar from "../components/Calendar";
// import { useUser } from "../context/userContextFull";

// const Homepage = () => {
//   const currentUser = useUser();
//   const isParent = currentUser.is_parent;
//   const userSessions = currentUser.sessions;

//   if (isParent) {
//     return (
//       <Container sx={{ display: "flex" }}>
//         <MyCalendar />
//       </Container>
//     );
//   } else {
//     // Render container with "has_happened" equal to false from DB
//     return (
//       <Container>
//         {/* Fetch data from the database and conditionally render */}
//       </Container>
//     );
//   }
// };

// export default Homepage;
