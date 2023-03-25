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
import Select from "react-select";
import "chartjs-adapter-date-fns";
import { it } from "date-fns/locale";
import { fillMissingMonths, MonthlyInjury } from "../utils/chart";
import { IoMdAdd } from "react-icons/io"

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ReportScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [factory, setFactory] = React.useState<Factory>();
  const [monthlyData, setMonthlyData] = React.useState<MonthlyInjury[]>();
  const [error, setError] = React.useState<string>();
  const [selectedYear, setSelectedYear] = React.useState<{
    year: number;
  }>({ year: new Date().getFullYear() });
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    handleFactoryFetch();
    fetchInjuriesData();
  }, [id, selectedYear]);

  const handleFactoryFetch = async () => {
    try {
      const response = await axios.get(`/api/factory/${id}`);
      setFactory(response.data);
    } catch (err) {
      handleError(err as AxiosError);
    }
  };

  const fetchInjuriesData = async () => {
    try {
      const response = await axios.get<MonthlyFactoryReport[]>(
        `/api/report/${id}?year=${selectedYear.year}`
      );
      const data = response.data.map(el => ({
        date: new Date(el.date),
        count: el.count,
      }));
      setMonthlyData(data);
    } catch (err) {
      handleError(err as AxiosError);
    }
  };

  function handleError(err: AxiosError) {
    if (err.response?.status === 404) {
      return navigate("/app/factory", { replace: true });
    }

    setError((err.response?.data as any).message);
  }

  function buildPageContent() {
    // TODO: implement
  }

  if (error) {
    return <ErrorIndicator />;
  }

  if (!factory || !monthlyData) {
    return <LoadingIndicator className="mx-auto w-max my-24" />;
  }

  let chartData = fillMissingMonths(monthlyData);

  const yearOptions = Array.from({ length: 15 }, (_, i) => ({
    year: new Date().getFullYear() - i,
  }));

  return (
    <main className="max-w-4xl mx-auto mb-4">
      <div className="flex items-center justify-between mb-2 px-6">
        <PageTitle
          title={factory?.name}
          canGoBack
          trailing={
            <MdEditNote
              className="text-4xl text-primary cursor-pointer"
              onClick={() => navigate(`/app/factory/${id}`)}
            />
          }
        />
      </div>
      <div className="px-3 py-0 relative h-60 w-full sm:h-80">
        <div className="flex items-center justify-end">
          <span className="mr-4">Anno: </span>
          <Select
            isSearchable={false}
            options={yearOptions}
            getOptionLabel={el => el.year.toString()}
            getOptionValue={el => el.year.toString()}
            onChange={el => setSelectedYear(el!)}
            value={selectedYear}
            className="w-32 mr-3"
          />
        </div>
        <Line
          className="mx-auto h-full w-full"
          options={{
            maintainAspectRatio: false,
            normalized: true,
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
      <div className="flex items-center w-full gap-8 mt-16">
      <button
          className="btn flex-1 cursor-pointer"
          onClick={() => navigate("/app/injury/add") }
        >
          <IoMdAdd className="text-2xl sm:mr-2" />
          <span className="hidden sm:block">Nuovo Infortunio</span>
        </button>
      </div>
    </main>
  );
}

export default ReportScreen;
