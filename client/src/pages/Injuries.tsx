import React, { useEffect } from "react";
import { Factory, Injury } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { AxisOptions, Chart } from "react-charts";
import PageTitle from "../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

type MonthlyInjuries = {
  date: Date;
  count: number;
};

type Series = {
  data: MonthlyInjuries[];
};

function InjuriesScreen() {
  const { id } = useParams()
  const [factory, setFactory] = React.useState<Factory>() 
  const [series, setSeries] = React.useState()
  const [report , setReport] = React.useState()
  const [error, setError] = React.useState<string>();
  const navigate = useNavigate()

  useEffect(() => {
    handleFactoryFetch();
    fetchInjuriesData();
  }, [id]);

  const handleFactoryFetch = async () => {
    try {
      const response = await axios.get(`/api/factory/${id}`);
      setFactory(response.data);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 404) {
        return navigate(`/app/factory/${id}`);
      }

      const errorMessage = (error.response?.data as any).message;
      setError(errorMessage);
    }
  };

  const fetchInjuriesData = async () => {
    try{
      const response = await axios.get(`/api/report/${id}`);
      setSeries(response.data)
    }
    catch (err) {
      const error = err as AxiosError
      if(error.response?.status === 404){
        return navigate(`/app/factory/${id}`)
      }

      const errorMessage = (error.response?.data as any).message;
      setError(errorMessage);
    }
  }

  const primaryAxis = React.useMemo(
    (): AxisOptions<MonthlyInjuries> => ({
      getValue: (el) => el.date
      
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MonthlyInjuries>[] => [{
      getValue: (el) => el.count,
      elementType: "line"
    }],
    []
  );

  return (
    <main className="max-w-4xl mx-auto mb-4 px-6">   
      <div className="flex items-center justify-between mb-2 ">
        <PageTitle title={"Gestione Infortuni" + " " +  factory?.name} canGoBack />
        <button
          className="btn !rounded-full w-10 h-50 !p-0 sm:h-auto sm:w-auto sm:!px-4 sm:!py-3 sm:!rounded-md"
          onClick={() => navigate(`/app/factory/${id}/report`)}
        >
        <IoMdAdd className="text-2xl sm:mr-2" />
        <span className="hidden sm:block">Nuovo Infortunio</span>
        </button>
      </div>
      <div className="w-full h-40 px-15 py-0 border-[2px] "> 
           {series && <Chart
            options={{
              data: series,
              primaryAxis,
              secondaryAxes,
            }}/>}
      </div>
      
    </main>
  );
}

export default InjuriesScreen;
