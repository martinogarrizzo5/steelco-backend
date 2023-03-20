import classNames from "classnames";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingIndicatorProps {
  className?: string;
}

function LoadingIndicator(props: LoadingIndicatorProps) {
  return (
    <div className={classNames("flex items-center", props.className)}>
      <ClipLoader size={40} className="mr-4" color="var(--primaryColor)" />
      <span className="text-xl font-medium">Caricamento...</span>
    </div>
  );
}

export default LoadingIndicator;
