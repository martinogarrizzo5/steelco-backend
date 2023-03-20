import React from "react";
import logoImg from "../assets/logo.png";
import ClipLoader from "react-spinners/ClipLoader";

function InitialLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={logoImg} alt="logo" className="h-14 mt-3 mb-2" />
      <div className="flex mb-16">
        <ClipLoader size={32} className="mr-4" color="var(--primaryColor)" />
        <h1 className="text-xl font-medium mb-8">Caricamento...</h1>
      </div>
    </div>
  );
}

export default InitialLoading;
