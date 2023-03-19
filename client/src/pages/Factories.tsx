import React from "react";
import axios, { AxiosError } from "axios";
import { Factory } from "@prisma/client";
import { IoIosArrowForward } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import logo from "../assets/logo.png";
import ErrorIndicator from "../components/ErrorIndicator";
import LoadingIndicator from "../components/LoadingIndicator";

interface FactoryWithLastInjury extends Factory {
  lastInjuryDate: string;
}

function FactoriesScreen() {
  const [factories, setFactories] = React.useState<FactoryWithLastInjury[]>();
  const [error, setError] = React.useState<string>();

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

    if (!factories) return <LoadingIndicator />;

    return factories.map(factory => (
      <div
        key={`factory-${factory.id}`}
        className="flex items-center justify-between px-6 py-4 border-[1px] bg-tileHover cursor-pointer"
      >
        <div>
          <h2 className="sm:text-lg font-semibold text-primary mb-1">
            {factory.name}
          </h2>
          <p className="text-sm sm:text-base">{factory.address}</p>
          <p className="text-sm sm:text-base">
            Ultimo Infortunio:{" "}
            {new Date(factory.lastInjuryDate).toLocaleDateString("it-IT", {
              dateStyle: "long",
            })}
          </p>
        </div>
        <IoIosArrowForward className="text-2xl" />
      </div>
    ));
  };

  return (
    <main>
      <div className="max-w-4xl mx-auto mb-4">
        <img src={logo} alt="logo" className="h-10 mx-auto mt-3 mb-6" />
        <div className="flex items-center pl-6 mb-2">
          <h1 className="title">Gestione Infortuni</h1>
        </div>
        <div className="flex flex-col px-6 py-4 gap-4">{factoriesList()}</div>
      </div>
    </main>
  );
}

export default FactoriesScreen;
