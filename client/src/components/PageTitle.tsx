import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface PageTitleProps {
  title: string;
  canGoBack?: boolean;
}

function PageTitle(props: PageTitleProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-8">
      {props.canGoBack && (
        <button onClick={() => navigate(-1)}>
          <IoIosArrowBack className="text-3xl mr-3" />
        </button>
      )}
      <h1 className="title">{props.title}</h1>
    </div>
  );
}

export default PageTitle;
