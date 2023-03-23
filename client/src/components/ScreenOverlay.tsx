import React from "react";

interface IScreenOverlay {
  onClick?: () => void;
}

function ScreenOverlay(props: IScreenOverlay) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
      onClick={props.onClick}
    ></div>
  );
}

export default ScreenOverlay;
