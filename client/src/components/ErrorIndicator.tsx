import React from "react";

interface ErrorIndicatorProps {
  message?: string;
}

function ErrorIndicator(props: ErrorIndicatorProps) {
  const defaultErrorMessage = "Si è verificato un errore";

  return <div>{props.message ? props.message : defaultErrorMessage}</div>;
}

export default ErrorIndicator;
