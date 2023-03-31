export const getTodayDate = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  return date;
};

export const getFormattedDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("it-IT", {
    dateStyle: "long",
  });
};

export const shortenText = (text: string, maxLength: number) => {
  const newText = text;
  if (newText.length > maxLength) {
    return newText.substring(0, maxLength) + "...";
  }

  return newText;
};

export const safeNumParse = (stringNum: string) => {
  let tempNumber = new Number(stringNum);

  if (isNaN(tempNumber.valueOf())) {
    return undefined;
  }

  return tempNumber.valueOf();
};
