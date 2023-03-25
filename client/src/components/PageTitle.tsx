import classNames from "classnames";
import React, { ReactNode } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import IconButton from "./IconButton";

interface PageTitleProps {
  title: string;
  canGoBack?: boolean;
  trailing?: ReactNode;
  className?: string;
}

function PageTitle(props: PageTitleProps) {
  const navigate = useNavigate();

  return (
    <div
      className={classNames(
        "flex items-center mb-6 sm:mb-8 justify-between w-full",
        props.className
      )}
    >
      <div className="flex items-center">
        {props.canGoBack && (
          <IconButton
            onClick={() => navigate(-1)}
            icon={IoIosArrowBack}
            className="p-1.5 sm:p-2 mr-2 text-3xl"
          />
        )}
        <h1 className="title">{props.title}</h1>
      </div>
      {props.trailing}
    </div>
  );
}

export default PageTitle;
