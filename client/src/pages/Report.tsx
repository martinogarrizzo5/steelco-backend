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
import { it } from "date-fns/locale";
import { fillMissingMonths, MonthlyInjury } from "../utils/chart";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
      const data = response.data.map(el => ({
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

  const chartData = fillMissingMonths(series);
  console.log(chartData);

  return (
    <main className="max-w-4xl mx-auto mb-4">
      <div className="flex items-center justify-between mb-2 px-6">
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
      <div className="px-3 py-0 relative h-60 w-full sm:h-80">
        <Line
          className="mx-auto h-full w-full"
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                type: "time",
                adapters: {
                  date: {
                    locale: it,
                  },
                },
                time: {
                  unit: "month",
                  round: "month",
                  tooltipFormat: "MMMM yyyy",
                  displayFormats: {
                    month: "MMM",
                  },
                },
                ticks: {
                  autoSkip: true,
                },
                title: {
                  display: true,
                },
              },
              y: {
                offset: true,
                ticks: {
                  precision: 0,
                },
                title: {
                  display: true,
                  text: "Conteggio",
                },
              },
            },
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
            labels: chartData.map(el => el.date),
            datasets: [
              {
                label: "Infortuni",
                data: chartData.map(el => el.count),
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
