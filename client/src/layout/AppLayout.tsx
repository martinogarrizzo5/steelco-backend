import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";
import IconButton from "../components/IconButton";
import { useAuth } from "../store/authStore";

function AppLayout() {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <>
      <div className="flex items-center max-w-4xl mx-auto">
        <img
          src={logoImg}
          alt="logo"
          className="h-10 sm:h-14 mx-auto mt-3 mb-6 sm:mb-8 cursor-pointer"
          onClick={() => navigate("/app/factory")}
        />
        <IconButton
          icon={FiLogOut}
          className="absolute right-4 sm:right-8 top-3 p-2 text-2xl sm:text-3xl hover:bg-red-600 text-red-600"
          onClick={() => auth.logout()}
        />
      </div>
      <Outlet />
    </>
  );
}

export default AppLayout;
