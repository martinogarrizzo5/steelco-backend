export interface MonthlyInjury {
  date: Date;
  count: number;
}

export function fillMissingMonths(data: MonthlyInjury[]): MonthlyInjury[] {
  const monthlyInjuries: MonthlyInjury[] = [];
  if (data.length === 0) return monthlyInjuries;

  const startDate = new Date(data[0].date.getFullYear(), 0, 1);
  const endDate = new Date(data[data.length - 1].date.getFullYear(), 11, 31);
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const matchingData = data.find(d => {
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
