import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const SessionCard = ({ session }) => {
  const { id, date, salary, note, has_happened, user, interested_nannies } =
    session;

  return (
    <Card maxWidth="sm" style={{ display: "flex", margin: "10px " }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Session ID: {id}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Date: {date}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Salary: {salary}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Note: {note}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Has Happened: {has_happened ? "Yes" : "No"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          User ID: {user}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Interested Nannies: {interested_nannies.length}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
