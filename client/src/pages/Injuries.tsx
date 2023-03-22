import React, { useEffect } from "react";
import { Factory, Injury } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { AxisOptions, Chart } from "react-charts";
import PageTitle from "../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import LoadingIndicator from "../components/LoadingIndicator";

type MonthlyInjuries = {
  date: Date;
  count: number;
};

type Series = {
  label: string;
  data: MonthlyInjuries[];
};

function InjuriesScreen() {
  const { id } = useParams();
  const [factory, setFactory] = React.useState<Factory>();
  const [series, setSeries] = React.useState<Series[]>();
  const [report, setReport] = React.useState();
  const [error, setError] = React.useState<string>();
  const navigate = useNavigate();

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
    try {
      const response = await axios.get<MonthlyFactoryReport[]>(
        `/api/report/${id}`
      );
      const data = response.data.map((el) => ({
        date: new Date(el.date),
        count: el.count,
      }));
      setSeries([{ label: "Factory report", data: data }]);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 404) {
        return navigate(`/app/factory/${id}`);
      }

      const errorMessage = (error.response?.data as any).message;
      setError(errorMessage);
    }
  };

  const primaryAxis = React.useMemo(
    (): AxisOptions<MonthlyInjuries> => ({
      getValue: (el) => el.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MonthlyInjuries>[] => [
      {
        getValue: (el) => el.count,
        elementType: "line",
      },
    ],
    []
  );

  if (!factory || !series) {
    return <LoadingIndicator className="mx-auto w-max my-24" />;
  }

  return (
    <main className="max-w-4xl mx-auto mb-4 px-6">
      <div className="flex items-center justify-between mb-2 ">
        <PageTitle title={factory?.name} canGoBack trailing={<MdEditNote className="text-4xl sm:mr-2 text-primary cursor-pointer" onClick={() => navigate(`/app/factory/${id}`)}/>}/>
      </div>
      <div className="w-full h-40 px-15 py-0 border-[2px] ">
        {series && (
          <Chart
            options={{
              data: series,
              primaryAxis,
              secondaryAxes,
            }}
          />
        )}
      </div>
    </main>
  );
}

export default InjuriesScreen;
