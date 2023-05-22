import React from "react";
import MiniDrawer from "../pages/navbar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <React.Fragment>
      <MiniDrawer></MiniDrawer>
      <Outlet />
    </React.Fragment>
  );
}
