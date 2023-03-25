import React, { useEffect } from "react";
import { Factory, Injury } from "@prisma/client";
import axios, { AxiosError } from "axios";
import PageTitle from "../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
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
import { fillMissingMonths, MonthlyReport } from "../utils/chart";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { shortenText } from "../utils/format";
import IconButton from "../components/IconButton";

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
  const [selectedYear, setSelectedYear] = React.useState<{
    year: number;
  }>({ year: new Date().getFullYear() });

  const [factory, setFactory] = React.useState<Factory | null>();
  const [report, setReport] = React.useState<MonthlyReport[] | null>();
  const [injuries, setInjuries] = React.useState<Injury[] | null>();

  const [error, setError] = React.useState<string | null>();
  const [isReportLoading, setReportLoading] = React.useState(false);

  useEffect(() => {
    handleFactoryFetch();
    handleReportFetch();
  }, [id]);

  useEffect(() => {
    handleInjuriesFetch();
    handleReportFetch();
  }, [id, selectedYear]);

  const handleFactoryFetch = async () => {
    try {
      const response = await axios.get(`/api/factory/${id}`);
      setFactory(response.data);
    } catch (err) {
      handleNetworkError(err as AxiosError);
    }
  };

  const handleReportFetch = async () => {
    try {
      setReportLoading(true);
      const response = await axios.get<MonthlyFactoryReport[]>(
        `/api/report/${id}`,
        { params: { year: selectedYear.year } }
      );
      const data = response.data.map(el => ({
        date: new Date(el.date),
        count: el.count,
      }));
      setReport(data);
      setReportLoading(false);
    } catch (err) {
      handleNetworkError(err as AxiosError);
    }
  };

  const handleInjuriesFetch = async () => {
    try {
      setInjuries(null);
      const response = await axios.get<Injury[]>("/api/injury", {
        params: { year: selectedYear.year, factoryId: id },
      });
      const injuries = response.data.map(el => ({
        ...el,
        date: new Date(el.date),
      }));
      setInjuries(injuries);
    } catch (err) {
      handleNetworkError(err as AxiosError);
    }
  };

  function handleNetworkError(err: AxiosError) {
    if (err.response?.status === 404) {
      return navigate("/app/factory", { replace: true });
    }

    setError((err.response?.data as any).message);
  }

  if (error) {
    return <ErrorIndicator />;
  }

  if (!factory || !report) {
    return <LoadingIndicator className="mx-auto w-max my-24" />;
  }

  let chartData = fillMissingMonths(report);

  const yearOptions = Array.from({ length: 15 }, (_, i) => ({
    year: new Date().getFullYear() - i,
  }));

  const totalInjuries = chartData.reduce(
    (sum, monthlyReport) => sum + monthlyReport.count,
    0
  );

  function buildChart() {
    return (
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
              min: 0,
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
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-3">
      <PageTitle
        className="px-3"
        title={factory?.name}
        canGoBack
        trailing={
          <IconButton
            className="p-1.5 sm:p-2 text-3xl"
            onClick={() => navigate(`/app/factory/${id}`)}
            icon={FiEdit3}
          />
        }
      />
      <div className="py-0 relative h-60 w-full sm:h-80">
        <div className="flex items-center justify-center mb-4 sm:mb-0 sm:justify-end">
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
        {buildChart()}
      </div>
      <button
        className="btn w-full mt-16"
        onClick={() => navigate("/app/injury/add")}
      >
        <IoMdAdd className="text-2xl mr-2" />
        <span>Nuovo Infortunio</span>
      </button>
      <div>
        {isReportLoading || !injuries ? (
          <LoadingIndicator className="mx-auto w-max mt-16" />
        ) : (
          <div className="my-8 flex flex-col">
            <h2 className="text-xl font-semibold mx-auto sm:mx-0 mt-2 mb-4">
              {totalInjuries} Infortuni Totali Nel {selectedYear.year}
            </h2>
            {injuries.map(injury => (
              <div
                key={`injury-${injury.id}`}
                className="flex items-center border-b-2 border-grayBorder 
                py-4 px-4 sm:px-8 hover:bg-tileHover active:bg-tileActive cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium">
                    {shortenText(injury.description, 40)}
                  </h3>
                  <span className="text-subTitle">
                    {injury.date.toLocaleDateString("it")}
                  </span>
                </div>
                <div className="flex ml-4">
                  <IconButton
                    icon={RiDeleteBin6Line}
                    onClick={() => {}}
                    className="text-2xl text-red-500 hover:bg-red-500 cursor-pointer mr-4 p-1.5"
                  />
                  <IconButton
                    icon={FiEdit3}
                    onClick={() => {}}
                    className="text-2xl p-1.5"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ReportScreen;
