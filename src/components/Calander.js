import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { useUser } from "../context/userContextFull";
import CreateSession from "./CreateSession";
import { Create } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import SessionCard from "./SessionCard";

const initialValue = dayjs();

const ServerDay = (props) => {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    sessions,
    currentMonth,
    toggleModal,
    setSelectedDay,
    ...other
  } = props;

  const currentUser = useUser();
  const userSessions = currentUser.sessions || [];

  const newDayFormat =
    String(day["$D"]).length === 1 ? `0${day["$D"]}` : day["$D"];

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.includes(String(newDayFormat));

  const filteredSessions = userSessions.filter((session) => {
    const { date } = session;
    const parts = date.split("-");
    const sessionMonth = parseInt(parts[1]);
    const sessionDay = parseInt(parts[2]);

    return (
      sessionMonth === currentMonth && sessionDay === parseInt(newDayFormat)
    );
  });

  const hasHappened = filteredSessions.some((session) => session.has_happened);

  let badgeContent = "";

  if (isSelected) {
    if (hasHappened) {
      badgeContent = "✅";
    } else {
      badgeContent = "🌚";
    }
  }

  const handleDayClick = () => {
    toggleModal();
    const month = (day["$M"] + 1).toString().padStart(2, "0");
    const dayOfMonth = day["$D"].toString().padStart(2, "0");
    const today = `${day["$y"]}-${month}-${dayOfMonth}`;
    console.log(today);
    setSelectedDay(today);
  };

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={badgeContent}
    >
      <PickersDay
        onClick={handleDayClick}
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};

export default function MyCalendar() {
  const [open, setOpen] = React.useState(false);
  const toggleModal = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = () => setOpen(false);
  const currentUser = useUser();
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [currentMonth, setCurrentMonth] = React.useState(
    initialValue.month() + 1
  );
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const userSessions = currentUser.sessions || [];
  console.log("CHEK CHECK", userSessions);
  // const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (currentUser.sessions.length > 0) {
      let sessionDateAsArray;
      const sessionDaysOfMonth = currentUser.sessions.map((sessionDate) => {
        sessionDateAsArray = sessionDate.date.split("-");
        if (sessionDateAsArray[1] == currentMonth) {
          return sessionDateAsArray[2];
        }
      });
      setHighlightedDays(sessionDaysOfMonth);
    }
  }, [currentMonth]);

  const handleMonthChange = (date) => {
    setCurrentMonth(
      date["$M"].length == 1 ? `0${date["$M"] + 1}` : date["$M"] + 1
    );
  };
  const renderSession = () => {
    const filtered = userSessions.filter(
      (session) => session.date === selectedDay
    );

    if (filtered.length > 0) {
      return (
        <>
          {filtered.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </>
      );
    } else {
      return (
        <>
          <CreateSession selectedDay={selectedDay} onCloseModal={handleClose} />
        </>
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          bgcolor: "lightgrey",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderSession()}
      </Modal>
      <DateCalendar
        defaultValue={initialValue}
        // loading={isLoading}
        onMonthChange={(month) => handleMonthChange(month)}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
            currentMonth,
            toggleModal,
            setSelectedDay,
          },
        }}
      />
    </LocalizationProvider>
  );
}
