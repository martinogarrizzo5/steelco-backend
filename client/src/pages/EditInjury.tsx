import React, { useEffect } from "react";
import PageTitle from "../components/PageTitle";
import InjuryForm, { InjuryFormData } from "../components/InjuryForm";
import { useParams, useNavigate } from "react-router-dom";
import { Injury } from "@prisma/client";
import axios, { AxiosError } from "axios";
import ErrorIndicator from "../components/ErrorIndicator";
import LoadingIndicator from "../components/LoadingIndicator";
import { SnackBarType, useSnackBar } from "../store/snackBarStore";
import { showSnackbarOnAxiosError } from "../utils/error";
import { InjuryWithFactory } from "../types";

function EditInjury() {
  const snackBar = useSnackBar();
  const navigate = useNavigate();
  const { id } = useParams();
  const [injury, setInjury] = React.useState<InjuryWithFactory>();
  const [error, setError] = React.useState<string>();

  const handleInjuryFetch = async () => {
    try {
      const response = await axios.get(`/api/injury/${id}`);
      const injury = {
        ...response.data,
        date: new Date(response.data.date),
      };
      setInjury(injury);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 404) {
        return navigate("/app/injury");
      }

      const errorMessage = (error.response?.data as any).message;
      setError(errorMessage);
    }
  };

  useEffect(() => {
    handleInjuryFetch();
  }, [id]);

  const pageContent = () => {
    if (error) return <ErrorIndicator message={error} />;
    if (!injury) return <LoadingIndicator className="mt-32 mx-auto w-max" />;

    return (
      <InjuryForm
        onSubmit={submitEditedInjury}
        defaultData={injury}
        edit
        onDelete={() => {}}
      />
    );
  };

  const submitEditedInjury = async (data: InjuryFormData) => {
    try {
      const res = await axios.put(`/api/injury/${id}`, data);
      snackBar.show(res.data.message, SnackBarType.success);
      navigate("/app/injury", { replace: true });
    } catch (err) {
      console.log(err);
      showSnackbarOnAxiosError(err, snackBar);
    }
  };

  return (
    <main className="max-w-xl mx-auto mb-4 px-6">
      <PageTitle title="Modifica Infortunio" canGoBack />
      {pageContent()}
    </main>
  );
}

export default EditInjury;
