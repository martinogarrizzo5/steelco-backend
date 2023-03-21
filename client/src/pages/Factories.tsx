import React from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Factory } from "@prisma/client";
import {
  IoIosArrowDown,
  IoIosArrowDropdown,
  IoIosArrowForward,
  IoIosDocument,
  IoIosInformation,
  IoIosInformationCircle,
  IoIosPaper,
  IoIosTrash,
  IoMdAdd,
} from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import logo from "../assets/logo.png";
import ErrorIndicator from "../components/ErrorIndicator";
import LoadingIndicator from "../components/LoadingIndicator";
import { getFormattedDate } from "../utils/format";

interface FactoryWithLastInjury extends Factory {
  lastInjuryDate: string;
}

function FactoriesScreen() {
  const [factories, setFactories] = React.useState<FactoryWithLastInjury[]>();
  const [error, setError] = React.useState<string>();
  const navigate = useNavigate();

  const fetchFactories = async () => {
    try {
      const response = await axios.get("/api/report");
      setFactories(response.data);
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = (error.response?.data as any).message;
      setError(errorMessage);
    }
  };

  React.useEffect(() => {
    fetchFactories();
  }, []);

  const factoriesList = () => {
    if (error) return <ErrorIndicator message={error} />;

    if (!factories) return <LoadingIndicator className="mt-32 mx-auto" />;

    return factories.map((factory) => (
      <div
        key={`factory-${factory.id}`}
        className="flex items-center justify-between px-6 py-4 border-[1px] bg-tile hover:bg-tileHover active:bg-tileActive cursor-pointer"
        onClick={() => navigate(`/app/factory/${factory.id}/report`)}
      >
        <div>
          <h2 className="sm:text-lg font-semibold text-primary mb-1">
            {factory.name}
          </h2>
          <p className="text-sm sm:text-base">{factory.address}</p>

          <p className="text-sm sm:text-base">
            Ultimo Infortunio:{" "}
            {factory.lastInjuryDate
              ? getFormattedDate(factory.lastInjuryDate)
              : "Nessuno"}
          </p>
        </div>
        <IoIosArrowForward className="text-2xl " />
      </div>
    ));
  };

  return (
    <main className="max-w-4xl mx-auto mb-4 px-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="title">Gestione Infortuni</h1>
        <button
          className="btn !rounded-full w-10 h-10 !p-0 sm:h-auto sm:w-auto sm:!px-4 sm:!py-3 sm:!rounded-md"
          onClick={() => navigate("/app/factory/add")}
        >
          <IoMdAdd className="text-2xl sm:mr-2" />
          <span className="hidden sm:block">Nuovo Stabilimento</span>
        </button>
      </div>
      <div className="flex flex-col py-4 gap-4">{factoriesList()}</div>
    </main>
  );
}

export default FactoriesScreen;
