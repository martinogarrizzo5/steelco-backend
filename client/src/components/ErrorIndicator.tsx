import React from "react";
import { useNavigate } from "react-router-dom";

interface ErrorIndicatorProps {
  message?: string;
}

function ErrorIndicator(props: ErrorIndicatorProps) {
  const navigate = useNavigate();
  const defaultErrorMessage =
    "Si è verificato un errore. Perfavore riprova piu tardi";

  return (
    <div className="text-center mb-16 p-8 text-xl">
      <span className="block mb-4">
        {props.message ? props.message : defaultErrorMessage}
      </span>
      <button className="btn mx-auto" onClick={() => navigate("/app")}>
        Torna alla home
      </button>
    </div>
  );
}

export default ErrorIndicator;
