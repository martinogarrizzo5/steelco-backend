import React, { ReactNode } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface PageTitleProps {
  title: string;
  canGoBack?: boolean;
  trailing?: ReactNode;
}

function PageTitle(props: PageTitleProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-8 justify-between w-full">
      <div className="flex items-center">
        {props.canGoBack && (
          <button onClick={() => navigate(-1)}>
            <IoIosArrowBack className="text-3xl mr-3 text-primary" />
          </button>
        )}
        <h1 className="title">{props.title}</h1>
      </div>
      {props.trailing}
    </div>
  );
}

export default PageTitle;
