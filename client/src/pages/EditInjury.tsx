import React, { useEffect } from "react";
import PageTitle from "../components/PageTitle";
import InjuryForm, { InjuryFormData } from "../components/InjuryForm";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Factory, Injury } from "@prisma/client";
import axios, { AxiosError } from "axios";
import ErrorIndicator from "../components/ErrorIndicator";
import LoadingIndicator from "../components/LoadingIndicator";
import { SnackBarType, useSnackBar } from "../store/snackBarStore";
import { showSnackbarOnAxiosError } from "../utils/error";
import { DeleteInjuryPopup } from "../components/DeletePopup";

function EditInjury() {
  const snackBar = useSnackBar();
  const navigate = useNavigate();
  const { id } = useParams();
  const [injury, setInjury] = React.useState<Injury>();
  const [factories, setFactories] = React.useState<Factory[]>();
  const [error, setError] = React.useState<string>();

  useEffect(() => {
    handleInjuryFetch();
    fetchFactories();
  }, [id]);

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

  const fetchFactories = async () => {
    try {
      const response = await axios.get("/api/factory");
      setFactories(response.data);
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = (error.response?.data as any).message;
      setError(errorMessage);
    }
  };

  const submitEditedInjury = async (data: InjuryFormData) => {
    try {
      const dataToSend = {
        ...data,
        factoryId: data.factory?.id,
      };
      const res = await axios.put(`/api/injury/${id}`, dataToSend);
      snackBar.show(res.data.message, SnackBarType.success);
      navigate(`/app/factory/${data.factory?.id}/report`, { replace: true });
    } catch (err) {
      console.log(err);
      showSnackbarOnAxiosError(err, snackBar);
    }
  };

  const handleInjuryDelete = async (injuryId: number) => {
    if (!injury) return;

    DeleteInjuryPopup.fire({
      preConfirm: async () => {
        try {
          await axios.delete(`/api/injury/${injuryId}`);
          snackBar.show(
            "Infortunio eliminato con successo",
            SnackBarType.success
          );
          navigate(`/app/factory/${injury.factoryId}/report`, {
            replace: true,
          });
        } catch (err) {
          console.log(err);
          showSnackbarOnAxiosError(err, snackBar);
        }
      },
    });
  };

  const pageContent = () => {
    if (error) return <ErrorIndicator message={error} />;
    if (!injury || !factories)
      return <LoadingIndicator className="mt-32 mx-auto w-max" />;

    return (
      <InjuryForm
        onSubmit={submitEditedInjury}
        defaultData={injury}
        factoryOptions={factories}
        defaultFactoryId={injury.factoryId}
        editForm
        onDelete={() => handleInjuryDelete(injury.id)}
      />
    );
  };

  return (
    <main className="max-w-xl mx-auto mb-4 px-6">
      <PageTitle title="Modifica Infortunio" canGoBack />
      {pageContent()}
    </main>
  );
}

export default EditInjury;
