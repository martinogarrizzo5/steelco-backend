import { AxiosError, AxiosResponse } from "axios";
import { ISnackBar, SnackBarType } from "../store/snackBarStore";

interface AxiosErrorData {
  message?: string;
}

export const showSnackbarOnAxiosError = (error: any, snackbar: ISnackBar) => {
  let message = "Si è verificato un errore";

  if (error instanceof AxiosError) {
    const errorData = error.response?.data as AxiosErrorData;
    message =
      errorData.message ?? "Si è verificato un errore di richiesta al server";
  }

  snackbar.show(message, SnackBarType.error);
};

// based on axios request given as parameter, it returns a promise that resolves to the response data
export const handleRequestError = async (
  actionWithRequest: () => Promise<void>,
  snackbar: ISnackBar
) => {
  try {
    await actionWithRequest();
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
    showSnackbarOnAxiosError(error, snackbar);
  }
};
