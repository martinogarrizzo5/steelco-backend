import { it } from "date-fns/locale";
import { MonthlyReport } from "../types";

export const chartOptions = {
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
};

export function fillMissingMonths(data: MonthlyReport[]): MonthlyReport[] {
  const monthlyInjuries: MonthlyReport[] = [];
  if (data.length === 0) {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 12; i++) {
      monthlyInjuries.push({
        date: new Date(currentYear, i, 1),
        count: 0,
      });
    }
    return monthlyInjuries;
  }

  const startDate = new Date(data[0].date.getFullYear(), 0, 1);
  const endDate = new Date(data[data.length - 1].date.getFullYear(), 11, 31);
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const matchingData = data.find((d) => {
      return (
        d.date.getMonth() === currentDate.getMonth() &&
        d.date.getFullYear() === currentDate.getFullYear()
      );
    });

    monthlyInjuries.push({
      date: new Date(currentDate),
      count: matchingData ? matchingData.count : 0,
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return monthlyInjuries;
}
