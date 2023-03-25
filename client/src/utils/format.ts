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
