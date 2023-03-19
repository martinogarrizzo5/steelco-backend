import React from "react";
import logoImg from "../assets/logo.png";

function LoginScreen() {
  return (
    <main className="flex flex-col justify-center h-[100vh]">
      <div className="p-4 px-6 w-full">
        <img
          src={logoImg}
          alt="logo"
          className="block h-12 object-contain mx-auto"
        />
        <h1 className="text-2xl mt-6 mb-8 font-medium">Gestione Infortuni</h1>
        <form>
          <div className="flex flex-col mb-6">
            <label className="mb-2">Username</label>
            <input className="bg-gray-300 py-2 px-4 text-base" />
          </div>
          <div className="flex flex-col mb-6 ">
            <label className="mb-2">Password</label>
            <input className="bg-gray-300 py-2 px-4 text-base" />
          </div>
          <button
            type="submit"
            className="px-4 py-3 bg-blue-700 w-full text-white rounded-md"
          >
            <span>Accedi</span>
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginScreen;
