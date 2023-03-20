import { Factory } from "@prisma/client";
import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorIndicator from "../components/ErrorIndicator";
import FactoryForm, { FactoryFormData } from "../components/FactoryForm";
import LoadingIndicator from "../components/LoadingIndicator";
import PageTitle from "../components/PageTitle";
import { SnackBarType, useSnackBar } from "../store/snackBarStore";
import { showSnackbarOnAxiosError } from "../utils/error";

function EditFactory() {
  const { id } = useParams();
  const snackBar = useSnackBar();
  const navigate = useNavigate();
  const [factory, setFactory] = React.useState<Factory>();
  const [error, setError] = React.useState<string>();

  useEffect(() => {
    handleFactoryFetch();
  }, [id]);

  const handleFactoryFetch = async () => {
    try {
      const response = await axios.get(`/api/factory/${id}`);
      setFactory(response.data);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 404) {
        return navigate("/api/factory/new");
      }

      const errorMessage = (error.response?.data as any).message;
      setError(errorMessage);
    }
  };

  const pageContent = () => {
    if (error) return <ErrorIndicator message={error} />;
    if (!factory) return <LoadingIndicator className="mt-32 mx-auto w-max" />;

    return (
      <FactoryForm defaultValues={factory} onSubmit={submitEditedFactory} />
    );
  };

  const submitEditedFactory = async (data: FactoryFormData) => {
    try {
      const res = await axios.put(`/api/factory/${id}`, data);
      snackBar.show(res.data.message, SnackBarType.success);
      navigate("/api/factory");
    } catch (err) {
      console.log(err);
      showSnackbarOnAxiosError(err, snackBar);
    }
  };

  return (
    <main className="max-w-xl mx-auto mb-4 px-6">
      <PageTitle title="Modifica Stabilimento" canGoBack />
      {pageContent()}
    </main>
  );
}

export default EditFactory;
