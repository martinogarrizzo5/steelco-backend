export const getFormattedDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("it-IT", {
    dateStyle: "long",
  });
};
