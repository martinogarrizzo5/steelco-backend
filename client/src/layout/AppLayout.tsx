import React from "react";
import { Outlet } from "react-router-dom";
import logoImg from "../assets/logo.png";

function AppLayout() {
  return (
    <>
      <img
        src={logoImg}
        alt="logo"
        className="h-10 sm:h-14 mx-auto mt-3 mb-6 sm:mb-8"
      />
      <Outlet />
    </>
  );
}

export default AppLayout;
