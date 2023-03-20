import React, { useEffect } from "react";
import { Factory, Injury } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { AxisOptions, Chart } from "react-charts";
import PageTitle from "../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

function InjuriesScreen() {
  const { id } = useParams()
  const [factory, setFactory] = React.useState<Factory>()
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

  type AnnualInjuries = {
    date: Date[];
    injuries: number[];
  };
  
  type Series = {
    data: AnnualInjuries;
  };


  interface Types {
    date: Date[],
    count: number[],
  }

  const data: Types[] = [

    
  ]


  const primaryAxis = React.useMemo(
    (): AxisOptions<AnnualInjuries["date"][]> => ({
      getValue: datum => datum.map(date => date.toLocaleString()),
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<AnnualInjuries["injuries"]> => ({
      getValue: datum => datum.map(count => count)
    }),
    []
  );


  //flex items-center justify-between px-6 py-4 border-[1px] bg-tile hover:bg-tileHover active:bg-tileActive cursor-pointer

  return (
    <main className="max-w-4xl mx-auto mb-4 px-6">   
      <div className="flex items-center justify-between mb-2 ">
        <PageTitle title={"Gestione Infortuni" + " " + factory?.name} canGoBack />
        <button
          className="btn !rounded-full w-10 h-50 !p-0 sm:h-auto sm:w-auto sm:!px-4 sm:!py-3 sm:!rounded-md"
          onClick={() => navigate(`/app/factory/${id}/report`)}
        >
        <IoMdAdd className="text-2xl sm:mr-2" />
        <span className="hidden sm:block">Nuovo Infortunio</span>
        </button>
      </div>
      <div className="flex flex-col py-4 gap-4">
      </div>
      
    </main>
  );
}
/*<div className="w-full h-40 px-15 py-0 border-[2px] "> 
           <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
            }}/>
      </div>
      */

export default InjuriesScreen;
