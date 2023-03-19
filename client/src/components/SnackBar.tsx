import React, { useEffect, useState } from "react";
import { MdInfoOutline, MdCheck } from "react-icons/md";
import { useSnackBar } from "../store/snackBarStore";
import classNames from "classnames";

function SnackBar() {
  const snackBar = useSnackBar();
  const timer = React.useRef<NodeJS.Timer | null>();

  const removeSnackBar = () => {
    snackBar.hide();
  };

  useEffect(() => {
    clearTimeout(timer!.current!);
    timer.current = setTimeout(removeSnackBar, 3000);
  }, [snackBar]);

  const color = () => {
    switch (snackBar.type) {
      case "error":
        return "bg-red-600";
      case "success":
        return "bg-green-700";
      default:
        return "bg-red-600";
    }
  };

  const icon = () => {
    switch (snackBar.type) {
      case "error":
        return <MdInfoOutline className="mr-2 h-6 w-6" />;
      case "success":
        return <MdCheck className="mr-2 h-6 w-6" />;
      default:
        return <MdInfoOutline className="mr-2 h-6 w-6" />;
    }
  };

  return (
    <div
      className={classNames(
        `fixed z-[1000] top-0 left-0 w-full p-2 text-white flex items-center justify-center text-sm sm:text-lg text-center`,
        color()
      )}
    >
      {icon()}
      <p>{snackBar.message}</p>
    </div>
  );
}

export default SnackBar;
