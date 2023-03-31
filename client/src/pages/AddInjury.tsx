import { useEffect, useState } from "react";
import InjuryForm from "../components/InjuryForm";
import PageTitle from "../components/PageTitle";
import { InjuryFormData } from "../components/InjuryForm";
import axios, { AxiosError } from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSnackBar, SnackBarType } from "../store/snackBarStore";
import { showSnackbarOnAxiosError } from "../utils/error";
import { Factory } from "@prisma/client";
import LoadingIndicator from "../components/LoadingIndicator";
import { getTodayDate, safeNumParse } from "../utils/format";

function AddInjury() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const snackBar = useSnackBar();
  const [factories, setFactories] = useState<Factory[]>();
  const [error, setError] = useState<string>();

  const factoryId = searchParams.get("factoryId");

  useEffect(() => {
    fetchFactories();
  }, []);

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

  const submitData = async (data: InjuryFormData) => {
    if (!data.factory) return;

    try {
      const res = await axios.post("/api/injury", data);
      snackBar.show(res.data.message, SnackBarType.success);
      navigate(`/app/factory/${data.factory.id}/report`);
    } catch (err) {
      console.log(err);
      showSnackbarOnAxiosError(err, snackBar);
    }
  };

  const buildPageContent = () => {
    if (!factories) return <LoadingIndicator className="mt-32 mx-auto w-max" />;

    return (
      <InjuryForm
        onSubmit={submitData}
        defaultFactoryId={factoryId ? safeNumParse(factoryId) : undefined}
        factoryOptions={factories}
        defaultData={{
          date: getTodayDate(),
        }}
      />
    );
  };

  return (
    <main className="max-w-xl mx-auto mb-4 px-6">
      <PageTitle title="Aggiungi Infortunio" canGoBack />
      {buildPageContent()}
    </main>
  );
}

export default AddInjury;
