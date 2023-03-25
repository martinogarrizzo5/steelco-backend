import classNames from "classnames";
import React from "react";
import { IconType } from "react-icons";

interface IconButtonProps {
  className?: string;
  onClick: () => void;
  icon: IconType;
}

function IconButton(props: IconButtonProps) {
  return (
    <div
      className={classNames(
        "hover:bg-primary hover:bg-opacity-10 active:bg-opacity-25 rounded-full cursor-pointer text-primary",
        props.className
      )}
      onClick={props.onClick}
    >
      <props.icon />
    </div>
  );
}

export default IconButton;
