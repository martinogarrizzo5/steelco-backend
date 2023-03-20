import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import FactoryForm, { FactoryFormData } from "../components/FactoryForm";
import { SnackBarType, useSnackBar } from "../store/snackBarStore";
import { showSnackbarOnAxiosError } from "../utils/error";
import PageTitle from "../components/PageTitle";

function AddFactory() {
  const navigate = useNavigate();
  const snackBar = useSnackBar();

  const submitFactoryData = async (data: FactoryFormData) => {
    try {
      const res = await axios.post("/api/factory", data);
      snackBar.show(res.data.message, SnackBarType.success);
      navigate("/api/factory");
    } catch (err) {
      console.log(err);
      showSnackbarOnAxiosError(err, snackBar);
    }
  };

  return (
    <main className="max-w-xl mx-auto mb-4 px-6">
      <PageTitle title="Aggiungi Stabilimento" canGoBack />
      <FactoryForm onSubmit={submitFactoryData} />
    </main>
  );
}

export default AddFactory;
