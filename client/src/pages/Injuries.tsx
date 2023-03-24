import React, { useEffect } from "react";
import { Factory, Injury } from "@prisma/client";
import axios, { AxiosError } from "axios";
import PageTitle from "../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import LoadingIndicator from "../components/LoadingIndicator";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ErrorIndicator from "../components/ErrorIndicator";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyInjury {
  date: Date;
  count: number;
}

function InjuriesScreen() {
  const { id } = useParams();
  const [factory, setFactory] = React.useState<Factory>();
  const [series, setSeries] = React.useState<MonthlyInjury[]>();
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
        `/api/report/${id}?year=2023`
      );
      const data = response.data.map((el) => ({
        date: new Date(el.date),
        count: el.count,
      }));
      setSeries(data);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 404) {
        return navigate(`/app/factory/${id}`);
      }

      const errorMessage = (error.response?.data as any).message;
      setError(errorMessage);
    }
  };

  if (error) {
    return <ErrorIndicator />;
  }

  if (!factory || !series) {
    return <LoadingIndicator className="mx-auto w-max my-24" />;
  }

  return (
    <main className="max-w-4xl mx-auto mb-4 px-6">
      <div className="flex items-center justify-between mb-2 ">
        <PageTitle
          title={factory?.name}
          canGoBack
          trailing={
            <MdEditNote
              className="text-4xl sm:mr-2 text-primary cursor-pointer"
              onClick={() => navigate(`/app/factory/${id}`)}
            />
          }
        />
      </div>
      <div className="px-15 py-0 relative h-full w-full sm:h-80">
        <Line
          className="mx-auto h-full w-full"
          options={{
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "month",
                },
                ticks: {
                  autoSkip: true,
                },
                title: {
                  display: true,
                  text: "Data",
                },
              },
              y: {
                ticks: {
                  precision: 0,
                },
                title: {
                  display: true,
                  text: "Conteggio",
                },
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
                labels: {
                  usePointStyle: true,
                },
              },
              title: {
                display: false,
                text: "Infortuni",
              },
            },
          }}
          data={{
            labels: series.map((el) => el.date),
            datasets: [
              {
                label: "Infortuni",
                data: series.map((el) => el.count),
                borderColor: "#465794",
                backgroundColor: "#243572",
                pointRadius: 5,
                tension: 0.3,
              },
            ],
          }}
        />
      </div>
    </main>
  );
}

export default InjuriesScreen;
