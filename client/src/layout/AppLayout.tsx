import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";

function AppLayout() {
  const navigate = useNavigate();

  return (
    <>
      <img
        src={logoImg}
        alt="logo"
        className="h-10 sm:h-14 mx-auto mt-3 mb-6 sm:mb-8 cursor-pointer"
        onClick={() => navigate("/app/factory")}
      />
      <Outlet />
    </>
  );
}

export default AppLayout;
