import classNames from "classnames";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  name: string;
  type: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
  formRegister: UseFormRegisterReturn;
  placeholder?: string;
}

function Input(props: InputProps) {
  return (
    <div
      className={classNames(
        "input w-full flex relative",
        props.trailing && "!pr-16"
      )}
    >
      <input
        type={props.type}
        className="w-full"
        placeholder={props.placeholder}
        {...props.formRegister}
        name={props.name}
        id={props.name}
      />
      <button
        type="button"
        onClick={props.onClick}
        className={classNames(
          "absolute right-4 top-[50%] translate-y-[-50%]",
          props.onClick ? "cursor-pointer" : "cursor-default"
        )}
      >
        {props.trailing}
      </button>
    </div>
  );
}

export default Input;
